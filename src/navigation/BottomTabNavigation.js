import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS, FONTS } from '../../constants';
import { Chat, Contact, More, Profile, Welcome, Home } from '../screens';
import { FontAwesome, Feather, Ionicons, Entypo, AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: COLORS.white,
          bottom: 0,
          right: 0,
          left: 0,
          elevation: 0,
          height: 60
        }
      }}>
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {
                  focused ? (
                    <>
                      <AntDesign
                        name='home'
                        size={25}
                        color={COLORS.black} />
                    </>
                  ) : (
                    <AntDesign
                      name='home'
                      size={19}
                      color={COLORS.secondaryBlack} />
                  )
                }
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name='Cart'
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {
                  focused ? (
                    <>
                      <Feather
                        name='shopping-cart'
                        size={25}
                        color={COLORS.black} />
                    </>
                  ) : (
                    <Feather
                      name='shopping-cart'
                      size={19}
                      color={COLORS.secondaryBlack} />
                  )
                }
              </View>
            )
          }
        }}
      />
      <Tab.Screen
        name='More'
        component={More}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {
                  focused ? (
                    <>
                      <Feather
                        name='more-horizontal'
                        size={25}
                        color={COLORS.black} />
                    </>
                  ) : (
                    <Feather
                      name='more-horizontal'
                      size={19}
                      color={COLORS.secondaryBlack} />
                  )
                }
              </View>
            )
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigation;