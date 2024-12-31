import { ApolloClient, InMemoryCache } from '@apollo/client';

const SmartScanClient = new ApolloClient({
  uri: 'https://entity-api.iot-project.pan93.com/',
  cache: new InMemoryCache(),
});

export default SmartScanClient;
