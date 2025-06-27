import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch } from 'react-native';

type Props = {
  height: string;
  setHeight: (height: string) => void;
  weight: string;
  setWeight: (height: string) => void;
  onNext: (name: string) => void;
};

const weightData = Array.from({ length: 500 }, (_, index) => ({
  value: index,
  label: index.toString(),
}));

export default function OnboardingStepThree({ height, setHeight, weight, setWeight, onNext }: Props) {

  return (
    <View style={styles.contentContainer}>
        <Text style={styles.heading}>What is your height and weight?</Text>
        <TextInput
            style={styles.input}
            placeholder="Height"
            value={height}
            onChangeText={setHeight}
            autoCapitalize="none"
        />
        <TextInput
            style={styles.input}
            placeholder="Weight"
            value={weight}
            onChangeText={setWeight}
            autoCapitalize="none"
        />
        
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
  }
});