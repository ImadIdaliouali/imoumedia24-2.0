import React, { useEffect, useState } from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from "@react-native-community/netinfo";

import { HomeScreen, DetailsScreen } from './src/screens';

const Stack = createNativeStackNavigator();

function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setIsConnected(state.isConnected);
    });
    unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;