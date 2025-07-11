import React from 'react'
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'

interface CardProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function Card({ children, style }: CardProps) {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  )
}

interface CardHeaderProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function CardHeader({ children, style }: CardHeaderProps) {
  return (
    <View style={[styles.cardHeader, style]}>
      {children}
    </View>
  )
}

interface CardTitleProps {
  children: React.ReactNode
  style?: TextStyle
}

export function CardTitle({ children, style }: CardTitleProps) {
  return (
    <Text style={[styles.cardTitle, style]}>
      {children}
    </Text>
  )
}

interface CardDescriptionProps {
  children: React.ReactNode
  style?: TextStyle
}

export function CardDescription({ children, style }: CardDescriptionProps) {
  return (
    <Text style={[styles.cardDescription, style]}>
      {children}
    </Text>
  )
}

interface CardContentProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function CardContent({ children, style }: CardContentProps) {
  return (
    <View style={[styles.cardContent, style]}>
      {children}
    </View>
  )
}

interface CardFooterProps {
  children: React.ReactNode
  style?: ViewStyle
}

export function CardFooter({ children, style }: CardFooterProps) {
  return (
    <View style={[styles.cardFooter, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    backgroundColor: '#282828',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    padding: 24,
    paddingBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#b3b3b3',
  },
  cardContent: {
    padding: 24,
    paddingTop: 0,
  },
  cardFooter: {
    padding: 24,
    paddingTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
})