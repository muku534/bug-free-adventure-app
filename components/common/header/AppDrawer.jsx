import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

const AppDrawer =() => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home"/>
        <Drawer.Screen name="Notifications" />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default AppDrawer;