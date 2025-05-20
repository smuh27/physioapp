import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { observer } from '@legendapp/state/react';
import TodoItem from './TodoItem';
import { Tables } from '../../utils/database.types';

const TodoList = observer(({ todos }: { todos: Tables<'todos'>[] }) => {
  const renderItem = ({ item }: { item: Tables<'todos'> }) => <TodoItem todo={item} />;
  return (
    <FlatList
      data={todos}
      renderItem={renderItem}
      style={styles.todos}
      keyExtractor={(item) => item.id}
    />
  );
});

const styles = StyleSheet.create({
  todos: {
    flex: 1,
    marginTop: 16,
  },
});

export default TodoList;
