import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Play } from 'lucide-react-native';

const dummyRecords = [
  { id: '1', date: '2023-05-01', time: '14:30', camera: 'Front Door' },
  { id: '2', date: '2023-05-01', time: '15:45', camera: 'Back Yard' },
  { id: '3', date: '2023-05-02', time: '09:15', camera: 'Garage' },
  { id: '4', date: '2023-05-02', time: '18:20', camera: 'Living Room' },
];

export function RecordsScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.recordItem}>
      <View>
        <Text style={styles.recordDate}>{item.date}</Text>
        <Text style={styles.recordTime}>{item.time}</Text>
        <Text style={styles.recordCamera}>{item.camera}</Text>
      </View>
      <Play color="#007AFF" size={24} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={dummyRecords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  list: {
    padding: 20,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  recordDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recordTime: {
    fontSize: 14,
    color: '#666',
  },
  recordCamera: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

