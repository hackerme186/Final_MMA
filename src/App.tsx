// App.tsx
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './src/auth/AuthNavigator'
import MainTabNavigator from './src/navigation/MainTabNavigator'
import { AuthProvider, useAuth } from './src/context/AuthContext'

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
