// src/navigation/MainTabNavigator.tsx
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeNavigator from '../home/HomeNavigator'
import SearchNavigator from '../search/SearchNavigator'
import LibraryNavigator from '../library/LibraryNavigator'
import SettingsNavigator from '../settings/SettingsNavigator'
import { Ionicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home'

          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline'
          else if (route.name === 'Search') iconName = focused ? 'search' : 'search-outline'
          else if (route.name === 'Library') iconName = focused ? 'musical-notes' : 'musical-notes-outline'
          else if (route.name === 'Settings') iconName = focused ? 'settings' : 'settings-outline'

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#1DB954',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Search" component={SearchNavigator} />
      <Tab.Screen name="Library" component={LibraryNavigator} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  )
}
