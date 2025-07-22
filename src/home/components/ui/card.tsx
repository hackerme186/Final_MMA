import React from 'react';
import { Platform, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}
export function CardHeader({ children, style }: CardHeaderProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

interface CardTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}
export function CardTitle({ children, style }: CardTitleProps) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

interface CardDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}
export function CardDescription({ children, style }: CardDescriptionProps) {
  return <Text style={[styles.description, style]}>{children}</Text>;
}

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}
export function CardContent({ children, style }: CardContentProps) {
  return <View style={[styles.content, style]}>{children}</View>;
}

interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}
export function CardFooter({ children, style }: CardFooterProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#282828',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
    padding: 12,
    marginVertical: 8,
  },
  header: {
    flexDirection: 'column',
    padding: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  content: {
    padding: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
});