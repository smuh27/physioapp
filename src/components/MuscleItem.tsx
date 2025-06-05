import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { toggleDone } from '../../utils/supabaseClient';
import { Tables } from '../../utils/database.types';
import { Image } from 'react-native';

const NOT_DONE_ICON = String.fromCodePoint(0x1f7e0);
const DONE_ICON = String.fromCodePoint(0x2705);

const MuscleItem = ({ muscle }: { muscle: Tables<'muscles'> }) => {
  const handlePress = () => {
    toggleDone(muscle.id);
  };
  return (
    <TouchableOpacity
      key={muscle.id}
      onPress={handlePress}
      style={[styles.muscle, muscle.is_active ? styles.is_active : null]}
    >
      <Image
        source={require('../assets/pectoralis_major.png')}
        style={{ width: 100, height: 100, marginBottom: 8 }}
      />
      <Text style={styles.muscleText}>
        {muscle.is_active ? DONE_ICON : NOT_DONE_ICON} {muscle.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  muscle: {
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffd',
  },
  is_active: {
    backgroundColor: '#dfd',
  },
  muscleText: {
    fontSize: 20,
  },
});

export default MuscleItem;
