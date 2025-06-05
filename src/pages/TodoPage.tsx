import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { observer } from '@legendapp/state/react';
import { todos$ as _todos$ } from '../../utils/supabaseClient';
import NewTodo from '../components/NewTodo';
import TodoList from '../components/TodoList';
import ClearTodos from '../components/ClearTodos';

const TodoPage = observer(() => {
  const todos = _todos$.get();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Legend-State Example</Text>
        <NewTodo />
        <TodoList todos={todos ? Object.values(todos) : []} />
        <ClearTodos />
      </SafeAreaView>
    </SafeAreaProvider>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TodoPage;
