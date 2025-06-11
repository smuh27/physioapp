import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { supabase } from './utils/supabaseClient';

export default function RootLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      // Redirect to login if not authenticated, else to tabs
      if (!session && window.location.pathname !== '/auth/login') {
        router.replace('/auth/login');
      } else if (session && !window.location.pathname.startsWith('/tabs')) {
        router.replace('/tabs');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) router.replace('/tabs');
      else router.replace('/auth/login');
    });

    return () => {
      subscription?.unsubscribe?.();
    };
  }, []);

  if (loading) return null;

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {!session ? (
          <Stack.Screen name="login" />
        ) : (
          <Stack.Screen name="tabs" />
        )}
      </Stack>
    </>
  );
}
