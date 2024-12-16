import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MonitorView } from '../components/MonitorView';

export function MonitorScreen() {
  const navigation = useNavigation();

  const monitors = [
    { id: 1, name: 'Main Monitor' },
    { id: 2, name: 'Back Yard' },
    // { id: 3, name: 'Garage' },
    // { id: 4, name: 'Living Room' },
  ];

  const handleMonitorPress = (monitorName: string) => {
    navigation.navigate('MonitorDetail', { monitorName });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.grid}>
        {monitors.map((monitor) => (
          <MonitorView
            key={monitor.id}
            name={monitor.name}
            onPress={() => handleMonitorPress(monitor.name)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
});
