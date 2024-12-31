import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Button } from 'react-native';
import { Play } from 'lucide-react-native';
import useSWR from 'swr';
import { StackNavigationProp } from '@react-navigation/stack';
import { useVideoPlayer, VideoView } from 'expo-video';

type Record = {
  start: string;
  duration: number;
  url: string;
};
//從資料庫讀取錄影紀錄
export function recordFetcher(stream: string): Promise<Record[]> {
  return fetch(`https://recordings.iot-project.pan93.com/list?path=${stream}`)
    .then((res) => res.json());
}

export function RecordsScreen({ navigation }: { navigation: StackNavigationProp<{}> }) {
  const stream = 'teststream';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: `${stream} 的錄影紀錄`,
    });
  }, [navigation]);

  const { data, error } = useSWR(stream, recordFetcher);

  const [isModalVisible, setModalVisible] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);

  const openModal = (url: string) => {
    setCurrentVideoUrl(url);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentVideoUrl(null);
  };

  const renderItem = ({ item }: { item: Record }) => {
    const start = new Date(item.start);
    //資料庫中的url是http，正確應是https，所以要轉換
    const url = item.url.replace('http://', 'https://');

    return (
      <View>
        <TouchableOpacity style={styles.recordItem} onPress={() => openModal(url)}>
          <View>
            <Text style={styles.recordDate}>
              {start.toLocaleString('zh-TW', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true,
              })}
            </Text>
            <Text style={styles.recordTime}>錄影時長：{item.duration} 秒</Text>
          </View>
          <Play color="#007AFF" size={24} />
        </TouchableOpacity>
      </View>
    );
  };

  const player = useVideoPlayer({
    uri: currentVideoUrl,
  });
//顯示錄影紀錄
  return (
    console.log(currentVideoUrl),
    <View style={styles.container}>
      {error && <Text>Failed to fetch the content: {error.message}</Text>}
      {data && (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.url}
          contentContainerStyle={styles.list}
        />
      )}

      {/* Modal for video player */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={closeModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
        
          {/* 顯示影片 URL
          <Text >URL: {currentVideoUrl}</Text> */}

          <VideoView
            style={styles.video}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
          <View style={styles.controlsContainer}>
            <Button title="關閉" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '90%',
    height: '70%',
    backgroundColor: '#000',
  },
  controlsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});
