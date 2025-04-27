import React, { useContext, useState, useRef } from 'react';
import { 
  View, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  StatusBar, 
  Text,
  Animated,
  Dimensions,
  Alert
} from 'react-native';
import { Card, Searchbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ProductContext } from '../context/ProductContext';
import { Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './ProductListScreenStyles';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 2 - 24; // Two items per row with spacing

export default function ProductListScreen() {
  const { products } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
  const [activeCategory, setActiveCategory] = useState('All');
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;

  // Simulated categories - replace with your actual categories
  const categories = ['All', 'Electronics', 'Clothing', 'Home', 'Sports'];

  const onChangeSearch = query => setSearchQuery(query);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || 
      (product.category && product.category === activeCategory);
    return matchesSearch && matchesCategory;
  });

  // Animation for header
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // Animation for items
  const fadeIn = (index) => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  };

  const renderGridItem = ({ item, index }) => (
    <Animated.View 
      style={{
        opacity: 1,
        transform: [{ 
          translateY: Animated.multiply(animatedValue, new Animated.Value(-10))
        }],
      }}
      onLayout={() => fadeIn(index)}
    >
      <TouchableOpacity 
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
        activeOpacity={0.7}
      >
        <Card style={styles.gridCard}>
          {/* Discount badge if product has discount */}
          {item.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{item.discount}% OFF</Text>
            </View>
          )}
          
          {/* Favorite button */}
          <TouchableOpacity style={styles.favoriteButton}>
            <AntDesign name="hearto" size={18} color="#aaa" />
          </TouchableOpacity>
          
          <View style={styles.imageContainer}>
            <Image
              source={typeof item.image === 'string' ? { uri: item.image } : item.image}
              style={styles.gridImage}
              resizeMode="cover"
            />
          </View>
          
          <Card.Content style={styles.gridCardContent}>
            <Text numberOfLines={1} style={styles.gridProductTitle}>{item.name}</Text>
            <View style={styles.priceRatingRow}>
              <Text style={styles.productPrice}>{item.price}</Text>
              {item.rating && (
                <View style={styles.ratingContainer}>
                  <AntDesign name="star" size={12} color="#FFD700" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              )}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderListItem = ({ item, index }) => (
    <Animated.View 
      style={{
        opacity: 1,
        transform: [{ 
          translateY: Animated.multiply(animatedValue, new Animated.Value(-10))
        }],
      }}
      onLayout={() => fadeIn(index)}
    >
      <TouchableOpacity 
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
        activeOpacity={0.7}
      >
        <Card style={styles.listCard}>
          {item.discount && (
            <View style={styles.listDiscountBadge}>
              <Text style={styles.discountText}>{item.discount}% OFF</Text>
            </View>
          )}
          <View style={styles.listCardInner}>
            <View style={styles.listImageContainer}>
              <Image
                source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                style={styles.listImage}
                resizeMode="cover"
              />
            </View>
            <Card.Content style={styles.listCardContent}>
              <Text numberOfLines={2} style={styles.listProductTitle}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
              {item.rating && (
                <View style={styles.ratingContainer}>
                  <AntDesign name="star" size={12} color="#FFD700" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
              )}
            </Card.Content>
            <TouchableOpacity style={styles.listFavoriteButton}>
              <AntDesign name="hearto" size={18} color="#aaa" />
            </TouchableOpacity>
          </View>
        </Card>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderItem = viewType === 'grid' ? renderGridItem : renderListItem;

  const toggleView = () => {
    setViewType(viewType === 'grid' ? 'list' : 'grid');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      
      {/* Animated Header */}
      <Animated.View 
        style={[styles.headerContainer, { 
          transform: [{ translateY: headerTranslateY }],
          opacity: headerOpacity
        }]}
      >
        <Text style={styles.appTitle}>VendOut</Text>
        <Text style={styles.appSubtitle}>Premium Shopping Experience</Text>
      </Animated.View>
      
      {/* Search and View Toggle Row */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search products"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={styles.searchInput}
          iconColor="#666"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.viewToggleButton} onPress={toggleView}>
          <Feather name={viewType === 'grid' ? 'list' : 'grid'} size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      
      {/* Category Tabs */}
      <View style={styles.categoryContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryTab,
                activeCategory === item && styles.activeCategoryTab
              ]}
              onPress={() => setActiveCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === item && styles.activeCategoryText
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoryList}
        />
      </View>
      
      {/* Products List */}
      <Animated.FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        key={viewType} // Force re-render when view type changes
        numColumns={viewType === 'grid' ? 2 : 1}
        contentContainerStyle={
          viewType === 'grid' ? styles.gridContainer : styles.listContainer
        }
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="database-search" size={60} color="#555" />
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or category</Text>
          </View>
        }
      />
      
      {/* Floating action button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => Alert.alert('Filter', 'Filter functionality placeholder')}
      >
        <Feather name="filter" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}