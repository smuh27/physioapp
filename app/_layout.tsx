import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Stack, useRouter } from 'expo-router';
import { clientIsOnboarded, getClientByAuthUserId, supabase } from './utils/supabaseClient';
import { SessionContext } from './utils/sessionContext';
import { showAlert } from './utils/alert';

export default function RootLayout() {
  const [session, setSession] = useState(null);
  // const [client, setClient] = useState(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    async function checkSessionAndRedirect() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!isMounted) return;
      setSession(session);
      setLoading(false);

      if (!session && window.location.pathname !== '/auth/login') {
        router.replace('/auth/login');
      } else if (session && !window.location.pathname.startsWith('/tabs')) {
          const { data: onboarded, } = await clientIsOnboarded(session.user.id);
          setIsOnboarded(onboarded);
          if (!onboarded && !window.location.pathname.startsWith('/onboarding')) {
            router.replace('/onboarding');
          } else {
            router.replace('/tabs');
          }
      }
    }

    checkSessionAndRedirect();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session) {
            const { data: onboarded, error } = await clientIsOnboarded(session.user.id);
            setIsOnboarded(onboarded);
            if (error){
              showAlert('Error', error.message);
              router.replace('/auth/login');
            }
            else if (!onboarded && !window.location.pathname.startsWith('/onboarding')) {
              router.replace('/onboarding');
            } else {
              router.replace('/tabs');
            }
        } else {
          router.replace('/auth/login');
        }
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe?.();
    };
  }, []);

  if (loading) return null;

  return (
    <SessionContext.Provider value={session}>
      {/* your navigation stack, tabs, etc. */}
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {!session ? (
          <Stack.Screen name="login" />
        ) : !isOnboarded ? (
          <Stack.Screen name="onboarding" />
        ) : (
          <Stack.Screen name="tabs" />
        )}
      </Stack>
    </SessionContext.Provider>
  );
}
