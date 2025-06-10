// import React, { useState, useEffect } from 'react';
// import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import HomePage from './src/pages/HomePage';
// import LoginPage from './src/pages/LoginPage';
// import { Session } from '@supabase/supabase-js';
// import { supabase } from './utils/supabaseClient';

// export default function App() {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [session, setSession] = useState<Session | null>(null)

//   // when the component renders, check if the user is logged in and set the session
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session)
//     });
//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session)
//     });
//   }, []);

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={{ flex: 1 }}>
//         { session && session.user ? <HomePage userId={session.user.id} session={session} /> : <LoginPage /> }
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// }
