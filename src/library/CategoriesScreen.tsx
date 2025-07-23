import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
// import { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { categoryService } from '../services/categoryService';
import { Category } from '../types';
import LoadingScreen from './components/LoadingScreen';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 cards per row

export default function CategoriesScreen() {
  const navigation = useNavigation();
  // const [categories, setCategories] = useState<Category[]>([]);
  // const [searchQuery, setSearchQuery] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
  // const [dataLoading, setDataLoading] = useState(true);

  // Mock data
  const categories: Category[] = [];
  const searchQuery = '';
  const isLoading = false;
  const dataLoading = false;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    // setDataLoading(true);
    const result = await categoryService.getCategories();
    if (!result.error && result.categories) {
      // setCategories(result.categories);
    }
    // setDataLoading(false);
  };

  const filteredCategories = searchQuery.trim() === ''
    ? categories
    : categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const goBackWithLoading = () => {
    // setIsLoading(true);
    setTimeout(() => {
      navigation.goBack();
      // setIsLoading(false);
    }, 200);
  };

  const handleCategoryPress = (category: Category) => {
    // TODO: Navigate to songs by category screen
    console.log('Category selected:', category.name);
  };

  if (isLoading || dataLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={goBackWithLoading}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Categories</Text>
      </View>
      <Text style={styles.subHeader}>{categories.length} music categories</Text>
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color="#aaa" style={{ marginLeft: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={() => {}}
        />
      </View>
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={[styles.categoryCard, { backgroundColor: item.color }]} 
            activeOpacity={0.85}
            onPress={() => handleCategoryPress(item)}
          >
            <Text style={styles.categoryName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.categoryDescription} numberOfLines={2}>
              {item.description || 'Music category'}
            </Text>
            {item.icon && (
              <Ionicons 
                name={item.icon as any} 
                size={32} 
                color="rgba(255,255,255,0.8)" 
                style={styles.categoryIcon}
              />
            )}
          </TouchableOpacity>
        )}
        style={{ marginTop: 8 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="grid-outline" size={64} color="#666" />
            <Text style={styles.emptyText}>No categories found</Text>
            <Text style={styles.emptySubtext}>Categories will appear here</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    paddingTop: 50,
    paddingHorizontal: 24,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  header: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  subHeader: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 16,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    marginBottom: 16,
    paddingRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  categoryCard: {
    width: CARD_WIDTH,
    height: 120,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
  },
  categoryName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  categoryDescription: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 12,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  categoryIcon: {
    position: 'absolute',
    bottom: 8,
    right: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  emptySubtext: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});
