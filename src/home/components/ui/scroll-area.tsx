import React from 'react'
import { ScrollView, StyleSheet, ViewStyle } from 'react-native'

interface ScrollAreaProps {
  children: React.ReactNode
  style?: ViewStyle
  horizontal?: boolean
  showsVerticalScrollIndicator?: boolean
  showsHorizontalScrollIndicator?: boolean
}

export function ScrollArea({
  children,
  style,
  horizontal = false,
  showsVerticalScrollIndicator = false,
  showsHorizontalScrollIndicator = false,
}: ScrollAreaProps) {
  return (
    <ScrollView
      style={[styles.container, style]}
      horizontal={horizontal}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
    >
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
