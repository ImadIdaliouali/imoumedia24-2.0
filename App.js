import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {Image, LogBox, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {DrawerItemList, createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {HomeStack} from './src/navigation';
import {COLORS, IMAGES} from './src/constants';

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
        }}
        drawerContent={props => (
          <View style={styles.drawerContainer}>
            <View style={styles.logoContainer}>
              <Image
                source={IMAGES.IMOUMEDIA24_LOGO}
                style={styles.logoImage}
              />
            </View>
            <DrawerItemList {...props} />
          </View>
        )}>
        <Drawer.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            title: 'Home',
            drawerIcon: ({color}) => (
              <MaterialIcons name="home" size={24} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  logoContainer: {
    height: 150,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.ACTIVE,
  },
  logoImage: {
    height: 150,
    width: '100%',
    resizeMode: 'cover',
  },
});

export default App;
