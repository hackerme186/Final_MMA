import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './home/screen/Home';
import HomePlayerScreen from './HomePlayer/screens/HomePlayer';
import QueueScreen from './queue/screens/Queue';
import RelaxScreen from './relax/screen/relax';

const Stack = createStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="HomePlayer" component={HomePlayerScreen} />
      <Stack.Screen name="Queue" component={QueueScreen} />
      <Stack.Screen name="Relax" component={RelaxScreen} />
    </Stack.Navigator>
  );
} 