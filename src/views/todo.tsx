import React from 'react';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { observer } from '@legendapp/state/react';
import { addTodo, todos$ as _todos$, toggleDone } from '../../utils/supabaseClient';
import { Tables } from '../../utils/database.types';

const NOT_DONE_ICON = String.fromCodePoint(0x1f7e0);
const DONE_ICON = String.fromCodePoint(0x2705);

const NewTodo = () => {
  const [text, setText] = useState('');
  const handleSubmitEditing = ({ nativeEvent: { text } }) => {
    setText('');
    addTodo(text);
  };
  return (
    <TextInput
      value={text}
      onChangeText={(text) => setText(text)}
      onSubmitEditing={handleSubmitEditing}
      placeholder="What do you want to do today?"
      style={styles.input}
    />
  );
};

const Todo = ({ todo }: { todo: Tables<'todos'> }) => {
  const handlePress = () => {
    toggleDone(todo.id);
  };
  return (
    <TouchableOpacity
      key={todo.id}
      onPress={handlePress}
      style={[styles.todo, todo.done ? styles.done : null]}
    >
      <Text style={styles.todoText}>
        {todo.done ? DONE_ICON : NOT_DONE_ICON} {todo.text}
      </Text>
    </TouchableOpacity>
  );
};

const Todos = observer(({ todos$ }: { todos$: typeof _todos$ }) => {
  const todos = todos$.get();
  const renderItem = ({ item: todo }: { item: Tables<'todos'> }) => (
    <Todo todo={todo} />
  );
  if (todos)
    return (
      <FlatList
        data={Object.values(todos)}
        renderItem={renderItem}
        style={styles.todos}
      />
    );
  return <></>;
});

const ClearTodos = () => {
  const handlePress = () => {
    console.log('delete');
  };
  return [].length ? (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.clearTodos}>Clear all</Text>
    </TouchableOpacity>
  ) : null;
};

const TodoView = observer(() => {
  return (
    <>
      <Text style={styles.heading}>Legend-State Example</Text>
      <NewTodo />
      <Todos todos$={_todos$} />
      <ClearTodos />
    </>
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
  todos: {
    flex: 1,
    marginTop: 16,
  },
  todo: {
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffd',
  },
  done: {
    backgroundColor: '#dfd',
  },
  todoText: {
    fontSize: 20,
  },
  clearTodos: {
    margin: 16,
    flex: 0,
    textAlign: 'center',
    fontSize: 16,
  },
});

export { TodoView, styles };
