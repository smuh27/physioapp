import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { addClient } from '../../utils/supabaseClient';
import { observer } from '@legendapp/state/react';
import { Session } from '@supabase/supabase-js';

type NewClientOnboardingComponentProps = {
  session: Session;
};

const NewClientOnboarding: React.FC<NewClientOnboardingComponentProps> = observer(({ session }) => {
  const email = session.user.email;
  const userId = session.user.id;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = () => {
    if (!email || !name || !age || !height || !weight || !gender || !userId) return;
    addClient(email, name, Number(age), Number(height), Number(weight), gender, userId);
    setName('');
    setAge('');
    setHeight('');
    setWeight('');
    setGender('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Who are you?</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} aria-disabled />
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Age" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Height (cm)" value={height} onChangeText={setHeight} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Weight (kg)" value={weight} onChangeText={setWeight} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Gender" value={gender} onChangeText={setGender} />
      <Button title="Start" onPress={handleSubmit} />
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    borderColor: '#999',
    borderRadius: 8,
    borderWidth: 2,
    height: 48,
    marginBottom: 16,
    padding: 12,
    fontSize: 18,
  },
});

export default NewClientOnboarding;
