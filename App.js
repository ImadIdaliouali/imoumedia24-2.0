import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen, DetailsScreen, FavoriteScreen} from './src/screens';

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="details" component={DetailsScreen} />
        <Stack.Screen name="favorite" component={FavoriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
