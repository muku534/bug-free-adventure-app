import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { COLORS, FONTS } from '../../constants';
import { Chat, Contact, Home, Laptops, More, Profile, Welcome } from '../screens';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import BottomTabNavigation from './BottomTabNavigation';

const Drawer = createDrawerNavigator()

function DrawerNavigator() {
    return (
        <Drawer.Navigator  >
            <Drawer.Screen name="Home" component={Home} options={{
                headerShown: false
            }} />
            <Drawer.Screen name="Laptops" component={Laptops} options={{
                headerShown: false
            }} />
            <Drawer.Screen name="Profile" component={Profile} options={{
                headerShown: false
            }} />
            <Drawer.Screen name="More" component={More} options={{
                headerShown: false
            }} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator