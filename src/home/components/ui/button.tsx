import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'default',
  size = 'default',
  style,
  textStyle,
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <Pressable style={[styles.base, style]} disabled={disabled} {...props}>
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1DB954',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});