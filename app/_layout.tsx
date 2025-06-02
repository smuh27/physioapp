// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabsLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: () => <MaterialCommunityIcons name="home" size={24} />,
            tabBarLabel: '',
            headerTitleAlign: 'center',
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: () => <Ionicons name="person" size={24} />,
            tabBarLabel: '',
            headerTitleAlign: 'center',
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: () => <Ionicons name="settings-sharp" size={24} />,
            tabBarLabel: '',
            headerTitleAlign: 'center',
          }}
        />
      </Tabs>
    </>
  );
}
