import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'

const profile = () => {
  // Placeholder user data
  const user = {
    name: 'Ans Amanat',
    age: 26,
    gender: 'Male',
    email: 'ansamanat@gmail.com',
  };

  return (
    
    <View style={styles.container}>
      {/* <Text style={styles.header}>Profile</Text> */}
        {/* <Image
          style={styles.image}
          source="https://picsum.photos/seed/696/3000/2000"
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        /> */}
      <View style={styles.profileSection}>
        <Text style={styles.label}>Name: <Text style={styles.value}>{user.name}</Text></Text>
        <Text style={styles.label}>Age: <Text style={styles.value}>{user.age}</Text></Text>
        <Text style={styles.label}>Gender: <Text style={styles.value}>{user.gender}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.value}>{user.email}</Text></Text>
      </View>
    </View>
  );
}

export default profile; 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    alignSelf: 'center',
  },
  profileSection: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  value: {
    fontWeight: '600',
    color: '#222',
  },
});
