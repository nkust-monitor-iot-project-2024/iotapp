import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { monitorAtom } from '../atoms/monitor';
import { Monitor } from 'lucide-react-native';

type Monitor = {
  id: number;
  name: string;
  isDetectionOn: boolean;
};

export function SmartScancreen() {
  const navigation = useNavigation();
  const [monitor, setMonitor] = useState<Monitor[]>([
    { id: 1, name: 'Main Monitor', isDetectionOn: true },
    { id: 2, name: 'Backyard', isDetectionOn: false },
    { id: 3, name: 'Garage', isDetectionOn: true },
    { id: 4, name: 'Living Room', isDetectionOn: false },
  ]);

  const [activeMontior, setActiveMonitor] = useAtom(monitorAtom);

  // 切換偵測狀態
  const toggleDetection = (id: number) => {
    setMonitor((prevList) =>
      prevList.map((monitor) =>
        monitor.id === id
          ? { ...monitor, isDetectionOn: !monitor.isDetectionOn }
          : monitor
      )
    );
  };

  // 監視器清單的渲染
  const renderMonitorItem = ({ item }: { item: Monitor }) => (
    <View style={styles.monitorContainer}>
      <TouchableOpacity
        style={styles.monitorInfo}
        onPress={() => {
          setActiveMonitor({ name: item.name })
          navigation.navigate('SmartScanRecordScreen');
        }}
      >
        <Text style={styles.monitorName}>{item.name}</Text>
      </TouchableOpacity>
      <Switch
        value={item.isDetectionOn}
        onValueChange={() => toggleDetection(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>智慧偵測</Text>
      <FlatList
        data={monitor}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMonitorItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  monitorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  monitorInfo: {
    flex: 1,
  },
  monitorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

