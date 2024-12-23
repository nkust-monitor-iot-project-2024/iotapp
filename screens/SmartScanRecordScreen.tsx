import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { monitorAtom } from '../atoms/monitor';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

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
  }
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

export const useEntities = (monitor: string | undefined) => {
  const [items, setItems] = useState<EntityNode[]>([]);
  const { loading, error, data } = useQuery<ListEntitiesResponse>(LIST_ENTITIES, {
    variables: { before: items[items.length - 1]?.cursor, monitor },
  });

  const currentPageItems: EntityNode[] = data?.monitor.entities.edges ?? [];

  return ({
    loading,
    error,
    data: [...items, ...currentPageItems],
    loadMore: () => {
      // put the current page items into the items array
      // useQuery will automatically refetch the query with the new cursor
      setItems([...items, ...currentPageItems]);
    },
  })
};

const EntityDetails = ({ monitor }: {
  monitor: string | undefined;
}) => {
  const { loading, error, data, loadMore } = useEntities(monitor);

  // const handleNext = () => {
  //   if (!data) {
  //     return;
  //   }

  //   if (data.monitor.entities.pageInfo.hasNextPage) {
  //     setCursorStack([...cursorStack, data.monitor.entities.pageInfo.endCursor]);
  //     setBefore(data.monitor.entities.pageInfo.endCursor);
  //   }
  // };

  // const handlePrevious = () => {
  //   const newCursorStack = [...cursorStack];
  //   const previousCursor = newCursorStack.pop();
  //   setCursorStack(newCursorStack);
  //   setBefore(previousCursor || null);
  // };

  return (
    <View style={styles.detailsContainer}>
      {error && <Text style={styles.error}>Error: {error?.message}</Text>}
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{ uri: item.node.url }}
              style={styles.image}
            />
            <View style={styles.cardContent}>
              <Text style={styles.label}>{item.node.label} <Text style={styles.confidence}>({item.node.confidence})</Text></Text>
              <Text style={styles.date}>{new Date(item.node.createdAt).toLocaleString()}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.node.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export function SmartScanRecordScreen() {
  const [activeMonitor, _] = useAtom(monitorAtom);

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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007acc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
