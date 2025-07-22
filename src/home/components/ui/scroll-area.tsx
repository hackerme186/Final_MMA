import React from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, ViewStyle } from 'react-native';

interface ScrollAreaProps extends Omit<ScrollViewProps, 'style'> {
  children: React.ReactNode;
  style?: ViewStyle;
}

export function ScrollArea({ children, style, ...props }: ScrollAreaProps) {
  return (
    <ScrollView style={[styles.container, style]} {...props}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// Nếu có ScrollBar, export như sau:
// export { ScrollArea, ScrollBar };
// Nếu không có ScrollBar, chỉ export ScrollArea:
