import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Switch, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai';
import { monitorAtom } from '../atoms/monitor';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

const LIST_MONITORS = gql`
  query GetMonitors {
    monitors {
      id
    }
  }
`;

type Monitor = {
  id: string;
}

export function SmartScancreen() {
  const navigation = useNavigation();
  const [activeMonitor, setActiveMonitor] = useAtom(monitorAtom);

  const { loading, error, data } = useQuery(LIST_MONITORS);

  if (loading) {
    return <Text style={styles.placeholder}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.error}>Error: {error.message}</Text>;
  }

  // 切換偵測狀態
  const toggleDetection = (id: string) => {
    // Optimistic UI update can be added here if needed.
  };

  // 監視器清單的渲染
  const renderMonitorItem = ({ item }: { item: Monitor }) => (
    <View style={styles.monitorContainer}>
      <TouchableOpacity
        style={styles.monitorInfo}
        onPress={() => {
          setActiveMonitor({ id: item.id });
          navigation.navigate('SmartScanRecordScreen');
        }}
      >
        <Text style={styles.monitorName}>{item.id ?? "<未分類>"}</Text>
      </TouchableOpacity>
      <Switch
        value={false}
        onValueChange={() => toggleDetection(item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>智慧偵測</Text>
      
      <FlatList
        data={data.monitors}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `item-${index}`)}
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
  placeholder: {
    fontSize: 16,
    color: '#aaa',
    textAlign: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
