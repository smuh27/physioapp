import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { observer } from '@legendapp/state/react';
import { muscles$ as _muscles$ } from '../../utils/SupaLegend';
import MuscleList from '../components/MuscleList';

const MusclesPage = observer(() => {
  const muscles = _muscles$.get();
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Legend-State Example</Text>
        <MuscleList muscles={muscles ? Object.values(muscles) : []} />
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

export default MusclesPage;
