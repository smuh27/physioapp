import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { supabase } from '../utils/supabaseClient';

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });
  }, []);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://ui-avatars.com/api/?name=User&background=4630EB&color=fff&size=128' }}
        style={styles.avatar}
      />
      <Text style={styles.heading}>Profile</Text>
      <Text style={styles.text}>Email: {user.email}</Text>
      <Text style={styles.text}>User ID: {user.id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    color: '#555',
    marginBottom: 8,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#4630EB',
  },
});
