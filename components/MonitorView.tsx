import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface MonitorViewProps {
  name: string;
  onPress: () => void;
}

export function MonitorView({ name, onPress }: MonitorViewProps) {
  //顯示監視器名稱
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    elevation: 2,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
