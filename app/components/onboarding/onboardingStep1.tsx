import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

type Props = {
  name: string;
  setName: (name: string) => void;
  gender: string;
  setGender: (gender: string) => void;
  onNext: () => void;
};

export default function OnboardingStepOne({ name, setName, gender, setGender, onNext }: Props) {

  return (
    <View style={styles.contentContainer}>
        <Text style={styles.heading}>Who are you?</Text>
        <Image
            source={{ uri: `https://ui-avatars.com/api/?name=${name !== '' ? name : 'User'}&background=4630EB&color=fff&size=128` }}
            style={styles.avatar}
        />
        <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
        />
        <Text>{gender}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setGender('male')} style={[styles.button]}>
            <Text style={styles.buttonText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setGender('female')} style={[styles.button]}>
            <Text style={styles.buttonText}>Female</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: { fontSize: 18, marginBottom: 8 },
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
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#4630EB',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'gray',
    fontWeight: 'bold',
  },
});