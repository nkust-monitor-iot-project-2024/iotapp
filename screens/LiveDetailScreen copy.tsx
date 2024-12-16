import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export function LiveDetailScreen({ route }) {
  const { monitorName } = route.params;
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{monitorName}</Text>
      <View style={styles.liveView}>
        <Text style={styles.liveText}>即時畫面 (模擬中)</Text>
      </View>
      <Button
        title={isRecording ? '停用智慧偵測' : '開始智慧偵測'}
        onPress={toggleRecording}
        color={isRecording ? 'red' : 'green'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  liveView: {
    flex: 1,
    marginBottom: 20,
    backgroundColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveText: {
    color: '#fff',
    fontSize: 18,
  },
});
