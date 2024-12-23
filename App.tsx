import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LiveScreen } from './screens/LiveScreen';
import { LiveDetailScreen } from './screens/LiveDetailScreen';
import { SmartScancreen } from './screens/SmartScanScreen';
import { SmartScanRecordScreen } from './screens/SmartScanRecordScreen';
import { RecordsScreen } from './screens/RecordsScreen';
import {  Tv, ScanFace, HistoryIcon } from 'lucide-react-native';

import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import EntityList from './EntityList';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 監視器堆疊導航
function MonitorStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LiveScreen"
        component={LiveScreen}
        options={{ title: '監視器清單' }}
      />
      <Stack.Screen
        name="MonitorDetail"
        component={LiveDetailScreen}
        options={{ title: '監視器即時畫面' }}
      />
    </Stack.Navigator>
  );
}

function SmartScanStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SmartScan"
        component={SmartScancreen}
        options={{ title: '智慧偵測' }}
      />
      <Stack.Screen
        name="SmartScanRecordScreen"
        component={SmartScanRecordScreen}
        options={{ title: '偵測紀錄' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerStyle: {
                backgroundColor: '#6200ee',
              },
              headerTintColor: '#fff',
              tabBarStyle: {
                backgroundColor: '#fff',
                borderTopWidth: 0,
                elevation: 3,
              },
              tabBarActiveTintColor: '#6200ee',
              tabBarInactiveTintColor: '#aaa',
              tabBarIcon: ({ color, size }) => {
                let icon;
                switch (route.name) {
                  case 'Live':
                    icon = <Tv color={color} size={size} />;
                    break;
                  case 'SmartScan':
                    icon = <ScanFace color={color} size={size} />;
                    break;
                  case 'Records':
                    icon = <HistoryIcon color={color} size={size} />;
                    break;
                }
                return icon;
              },
            })}
          >
            <Tab.Screen
              name="Live"
              component={MonitorStack}
              options={{ title: 'LIVE' }}
            />
            <Tab.Screen
              name="SmartScan"
              component={SmartScanStack}
              options={{ title: '智慧偵測' }}
            />
            <Tab.Screen
              name="Records"
              component={RecordsScreen}
              options={{ title: '錄影回放' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </SafeAreaProvider>
  );
}
