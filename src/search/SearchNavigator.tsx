import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ArtistScreen from './ArtistScreen';
import SearchDetailScreen from './SearchDetailScreen';
import SearchScreen from './SearchScreen';

const Stack = createStackNavigator();

export default function SearchNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchHome" component={SearchScreen} />
      <Stack.Screen name="SearchDetail" component={SearchDetailScreen} />
      <Stack.Screen name="Artist" component={ArtistScreen} />
    </Stack.Navigator>
  );
}
