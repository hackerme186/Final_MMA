import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface BottomTabBarProps {
  activeTab: string;
  onTabPress: (tab: string) => void;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab, onTabPress }) => (
  <View style={{ flexDirection: 'row', backgroundColor: '#181818', height: 60, borderTopColor: '#282828', borderTopWidth: 1 }}>
    <TabIcon name="home-outline" tab="Home" activeTab={activeTab} onTabPress={onTabPress} />
    <TabIcon name="search-outline" tab="Search" activeTab={activeTab} onTabPress={onTabPress} />
    <TabIcon name="settings-outline" tab="Settings" activeTab={activeTab} onTabPress={onTabPress} />
  </View>
);

const TabIcon = ({ name, tab, activeTab, onTabPress }: any) => (
  <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={() => onTabPress(tab)}>
    <Ionicons name={name} size={26} color={activeTab === tab ? '#1DB954' : '#b3b3b3'} />
  </TouchableOpacity>
); 