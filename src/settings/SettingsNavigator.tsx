import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';
import Logout from './LogoutScreen';


export type SettingsStackParamList = {
  SettingsScreen: undefined;
  ProfileScreen: undefined;
  Logout: undefined;
};

const Stack = createStackNavigator<SettingsStackParamList>();

const SettingsNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    <Stack.Screen name="Logout" component={Logout} />
  </Stack.Navigator>
);

export default SettingsNavigator;
