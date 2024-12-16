import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Video from 'react-native-video';

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
        {/* 替換模擬畫面為 HLS 播放器 */}
        <Video
          source={{ uri: 'https://hls-10319920-6785-4329-a29f-97593ad34500.zeabur.app/teststream/index.m3u8' }} // 替換成實際的 HLS URL
          controls
          style={styles.video}
          resizeMode="contain"
          onError={(error) => {
            console.error('播放錯誤:', error);
          }}
        />
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
  video: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});
