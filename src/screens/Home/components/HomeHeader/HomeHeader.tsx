import React from 'react';
import { View } from 'react-native';
import { ActionButtons } from './ActionButtons';
import { UserGreeting } from './UserGreeting';

export const HomeHeader = () => (
  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 24, paddingBottom: 12 }}>
    <UserGreeting userName="Logan" />
    <ActionButtons />
  </View>
); 