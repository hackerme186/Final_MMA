import React from 'react'
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'

interface ButtonProps {
  children: React.ReactNode
  onPress?: () => void
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

export function Button({
  children,
  onPress,
  variant = 'default',
  size = 'default',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const buttonStyle = [
    styles.base,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    style,
  ]

  const textStyleCombined = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    disabled && styles.disabledText,
    textStyle,
  ]

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={textStyleCombined}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  default: {
    backgroundColor: '#1DB954',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  destructive: {
    backgroundColor: '#ef4444',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1DB954',
  },
  secondary: {
    backgroundColor: '#6b7280',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  link: {
    backgroundColor: 'transparent',
  },
  defaultText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  destructiveText: {
    color: '#fff',
  },
  outlineText: {
    color: '#1DB954',
  },
  secondaryText: {
    color: '#fff',
  },
  ghostText: {
    color: '#1DB954',
  },
  linkText: {
    color: '#1DB954',
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  lg: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  icon: {
    width: 40,
    height: 40,
  },
  smText: {
    fontSize: 14,
    fontWeight: '500',
  },
  lgText: {
    fontSize: 18,
    fontWeight: '500',
  },
  iconText: {
    fontSize: 16,
    fontWeight: '500',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.5,
  },
  text: {
    textAlign: 'center',
  },
})