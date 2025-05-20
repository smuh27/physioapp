import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { addTodo } from '../../utils/SupaLegend';

const NewTodo = ({ style }: { style?: any }) => {
  const [text, setText] = React.useState('');
  const handleSubmitEditing = ({ nativeEvent: { text } }) => {
    setText('');
    addTodo(text);
  };
  return (
    <TextInput
      value={text}
      onChangeText={setText}
      onSubmitEditing={handleSubmitEditing}
      placeholder="What do you want to do today?"
      style={[styles.input, style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#999',
    borderRadius: 8,
    borderWidth: 2,
    flex: 0,
    height: 64,
    marginTop: 16,
    padding: 16,
    fontSize: 20,
  },
});

export default NewTodo;
