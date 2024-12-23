import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://entity-api.iot-project.pan93.com/',
  cache: new InMemoryCache(),
});

export default client;
