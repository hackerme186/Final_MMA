// App.tsx
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import AuthNavigator from './auth/AuthNavigator'
import { AuthProvider, useAuth } from './context/AuthContext'
import MainTabNavigator from './navigation/MainTabNavigator'

function RootNavigation() {
  const { session } = useAuth()

  return (
    <NavigationContainer>
      {session ? <MainTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  )
}
