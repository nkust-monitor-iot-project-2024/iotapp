import { useAtom } from 'jotai';
import Modal from 'react-native-modal';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { monitorAtom } from '../atoms/monitor';
import { gql, useQuery } from '@apollo/client';

//GraphQL查詢 辨識紀錄
const LIST_ENTITIES = gql`
  query ListEntities($monitor: String, $before: String) {
    monitor(id: $monitor) {
      entities(last: 5, before: $before) {
        edges {
          node {
            id
            confidence
            label
            createdAt
            url
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export interface ListEntitiesResponse {
  monitor: {
    entities: {
      edges: EntityNode[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
    };
  };
}

export interface EntityNode {
  node: Entity;
  cursor: string;
}

export interface Entity {
  id: string;
  confidence: number;
  label: string;
  createdAt: string;
  url: string;
}
//使用GraphQL查詢
export const useEntities = (monitor: string | undefined) => {
  const [items, setItems] = useState<EntityNode[]>([]);
  const { loading, error, data } = useQuery<ListEntitiesResponse>(LIST_ENTITIES, {
    variables: { before: items[items.length - 1]?.cursor, monitor },
  });

  const currentPageItems: EntityNode[] = data?.monitor.entities.edges ?? [];

  return {
    loading,
    error,
    data: [...items, ...currentPageItems],
    loadMore: () => {
      setItems([...items, ...currentPageItems]);
    },
  };
};

const EntityDetails = ({ monitor }: { monitor: string | undefined }) => {
  const { loading, error, data, loadMore } = useEntities(monitor);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };
//顯示辨識紀錄
  return (
    <View style={styles.detailsContainer}>
      {error && <Text style={styles.error}>Error: {error?.message}</Text>}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openModal(item.node.url)}>
            <View style={styles.card}>
              <Image source={{ uri: item.node.url }} style={styles.image} />
              <View style={styles.cardContent}>
                <Text style={styles.label}>
                  {item.node.label} <Text style={styles.confidence}>({item.node.confidence})</Text>
                </Text>
                <Text style={styles.date}>{new Date(item.node.createdAt).toLocaleString()}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.node.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />

      {/* 全屏模態框 */}
      
      <Modal isVisible={isModalVisible} onBackdropPress={closeModal}>
        <View style={styles.modalContent}>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
          )}
        </View>
      </Modal>
    </View>
  );
};

export function SmartScanRecordScreen() {
  const [activeMonitor] = useAtom(monitorAtom);

  return (
    <View style={styles.container}>
      <EntityDetails monitor={activeMonitor?.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff',
    padding: 20,
  },
  detailsContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    objectFit: 'contain',
  },
  cardContent: {
    padding: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  confidence: {
    fontSize: 16,
    color: '#007acc',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '80%',
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});
