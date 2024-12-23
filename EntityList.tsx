import React from 'react';
import { View, Text } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_ENTITIES = gql`
  query GetEntities {
    entities {
      id
      name
    }
  }
`;

const EntityList = () => {
  const { data, loading, error } = useQuery(GET_ENTITIES);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View>
      {data.entities.map((entity) => (
        <Text key={entity.id}>{entity.name}</Text>
      ))}
    </View>
  );
};

export default EntityList;
