// App.tsx
<<<<<<< HEAD
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './src/auth/AuthNavigator'
import MainTabNavigator from './src/navigation/MainTabNavigator'
import { AuthProvider, useAuth } from './src/context/AuthContext'
=======
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import AuthNavigator from './auth/AuthNavigator'
import { AuthProvider, useAuth } from './context/AuthContext'
import MainTabNavigator from './navigation/MainTabNavigator'
>>>>>>> 55264d3 (update home)

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
