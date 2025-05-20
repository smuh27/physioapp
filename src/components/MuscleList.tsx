import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { observer } from '@legendapp/state/react';
import MuscleItem from './MuscleItem';
import { Tables } from '../../utils/database.types';

const MuscleList = observer(({ muscles }: { muscles: Tables<'muscles'>[] }) => {
  const renderItem = ({ item }: { item: Tables<'muscles'> }) => <MuscleItem muscle={item} />;
  return (
    <FlatList
      data={muscles}
      renderItem={renderItem}
      style={styles.muscles}
      keyExtractor={(item) => item.id}
    />
  );
});

const styles = StyleSheet.create({
  muscles: {
    flex: 1,
    marginTop: 16,
  },
});

export default MuscleList;
