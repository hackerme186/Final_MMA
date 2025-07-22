import React from 'react';
import { StyleSheet, Text } from 'react-native';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
}

export const UserGreeting = ({ userName = 'User' }: { userName?: string }) => (
  <Text style={styles.greeting}>
    {getGreeting()}, {userName}!
  </Text>
);

const styles = StyleSheet.create({
  greeting: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
}); 