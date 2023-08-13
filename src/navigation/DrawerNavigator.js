import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { COLORS, FONTS } from '../../constants';
import { Chat, Contact, Home, More, Profile, Welcome } from '../screens';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator()

function DrawerNavigator() {
    return (
        <Drawer.Navigator  >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
            <Drawer.Screen name="More" component={More} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigator