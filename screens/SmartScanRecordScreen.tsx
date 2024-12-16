import { useAtom } from 'jotai';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { monitorAtom } from '../atoms/monitor';

export function SmartScanRecordScreen() {
  const [activeMonitor, _] = useAtom(monitorAtom);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{activeMonitor.name} 偵測紀錄</Text>
      {/* 這裡可以顯示監視器的偵測記錄資料 */}
      <Text style={styles.placeholder}>尚未實作記錄資料顯示</Text>
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
  placeholder: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
  },
});