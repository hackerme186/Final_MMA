import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../ThemedText';

export interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
  showSeeAll?: boolean;
  accessibilityLabel?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onSeeAll,
  showSeeAll = false,
  accessibilityLabel,
}) => {
  return (
    <View style={styles.container}>
      <ThemedText type="subtitle" style={styles.title} accessibilityLabel={accessibilityLabel || title}>
        {title}
      </ThemedText>
      {showSeeAll && (
        <Pressable
          style={styles.seeAllButton}
          onPress={onSeeAll}
          accessibilityLabel={`Xem tất cả ${title}`}
          accessibilityHint="Nhấn để xem tất cả mục trong phần này"
        >
          <ThemedText style={styles.seeAllText}>Xem tất cả</ThemedText>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  seeAllButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  seeAllText: {
    color: '#1DB954',
    fontWeight: '600',
    fontSize: 15,
  },
}); 