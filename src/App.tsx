import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import TodoPage from './pages/TodoPage';
import MusclePage from './pages/MusclesPage';
import LoginPage from './pages/LoginPage';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        {/* {loggedIn ? <TodoPage /> : <LoginPage onLogin={() => setLoggedIn(true)} />} */}
        {loggedIn ? <MusclePage /> : <LoginPage onLogin={() => setLoggedIn(true)} />}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
