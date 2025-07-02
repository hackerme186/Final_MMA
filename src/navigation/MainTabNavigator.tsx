// src/navigation/MainTabNavigator.tsx
import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Image } from 'react-native'
import HomeNavigator from '../home/HomeNavigator'
import SearchNavigator from '../search/SearchNavigator'

const Tab = createBottomTabNavigator()

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home'

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline'
            return <Ionicons name={iconName} size={size} color={color} />
          } else if (route.name === 'Search') {
            return (
              <Image
                source={require('../../assets/images/search/Frame 836 (1).png')}
                style={{ width: size, height: size, tintColor: color }}
                resizeMode="contain"
              />
            );
          }
          return null;
        },
        tabBarActiveTintColor: '#1DB954',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Search" component={SearchNavigator} />
    </Tab.Navigator>
  )
}
