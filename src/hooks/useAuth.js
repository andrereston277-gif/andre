import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId) => {
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    setProfile(data);
  }, []);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        if (session?.user) {
          setUser(session.user);
          await fetchProfile(session.user.id);
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      })();
    });
  }, [fetchProfile]);

  const signUp = async (email, password, displayName) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    const { data: { user: newUser } } = await supabase.auth.getUser();
    if (newUser) {
      await supabase.from('user_profiles').insert({
        id: newUser.id,
        display_name: displayName,
      });
      await fetchProfile(newUser.id);
    }
  };

  const signIn = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return { user, profile, loading, signUp, signIn, signOut };
}
