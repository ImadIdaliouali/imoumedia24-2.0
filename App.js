import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {HomeStack} from './src/navigation';
import {COLORS} from './src/constants';
import {FavoriteScreen} from './src/screens';

const Drawer = createDrawerNavigator();

function App() {
  useEffect(() => {
    LogBox.ignoreAllLogs();
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: COLORS.BASIC_BACKGROUND,
          },
        }}>
        <Drawer.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            title: 'Home',
            drawerIcon: () => <MaterialIcons name="home" size={24} />,
          }}
        />
        <Drawer.Screen
          name="Favorite"
          component={FavoriteScreen}
          options={{
            drawerIcon: () => <MaterialIcons name="favorite" size={24} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;
