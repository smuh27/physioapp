import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ClearTodos = () => {
  const handlePress = () => {
    // TODO: Implement clear all todos logic
    console.log('delete');
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.clearTodos}>Clear all</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  clearTodos: {
    margin: 16,
    flex: 0,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ClearTodos;
