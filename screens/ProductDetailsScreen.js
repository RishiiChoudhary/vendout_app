import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Alert,
  Animated,
  Dimensions
} from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  
  // Animation values
  const scrollY = useRef(new Animated.Value(0)).current;
  const imageScale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Check if the image is a URL or a local asset
  const imageSource = typeof product.image === 'string' && product.image.startsWith('http')
    ? { uri: product.image }  // Remote image URL
    : product.image;           // Local image require()
    
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  
  const toggleFavorite = () => {
    setFavorite(!favorite);
    // Add heartbeat animation
    Animated.sequence([
      Animated.timing(imageScale, {
        toValue: 1.2,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(imageScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  const addToCart = () => {
    // Animation for adding to cart
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    
    Alert.alert(
      "Added to Cart", 
      `${quantity} x ${product.name} added to your cart!`,
      [{ text: "OK" }]
    );
  };
  
  const buyNow = () => {
    Alert.alert(
      "Proceed to Checkout", 
      `You're about to purchase ${quantity} x ${product.name}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Continue", onPress: () => Alert.alert("Purchase", "This is a placeholder for checkout process.") }
      ]
    );
  };

  // Fade in effect when component mounts
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Calculate animation values for floating elements
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  
  const cardTranslateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  // Parallax effect for image
  const imageTranslateY = scrollY.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: [50, 0, -80],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Animated Header */}
      <Animated.View style={[styles.animatedHeader, { opacity: headerOpacity }]}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {product.name}
        </Text>
      </Animated.View>
      
      {/* Header Buttons */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={() => Alert.alert("Share", "Share functionality placeholder")}
        >
          <Feather name="share" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <Animated.ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Product Image with Parallax Effect */}
        <Animated.View style={[styles.imageContainer, { transform: [{ translateY: imageTranslateY }] }]}>
          <Image 
            source={imageSource} 
            style={styles.image} 
            resizeMode="contain"
          />
          <Animated.View 
            style={[styles.favoriteButton, { transform: [{ scale: favorite ? imageScale : 1 }] }]}
          >
            <TouchableOpacity onPress={toggleFavorite}>
              <AntDesign 
                name={favorite ? "heart" : "hearto"} 
                size={24} 
                color={favorite ? "#FF6B6B" : "#fff"} 
              />
            </TouchableOpacity>
          </Animated.View>
          
          {/* Floating promo badge if there's a discount */}
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discount}% OFF</Text>
            </View>
          )}
        </Animated.View>
        
        {/* Product Details Card with Floating Effect */}
        <Animated.View 
          style={[
            styles.detailsContainer,
            { transform: [{ translateY: cardTranslateY }] }
          ]}
        >
          {/* Price Tag with Original Price if Discounted */}
          <View style={styles.priceTag}>
            <Text style={styles.price}>{product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>{product.originalPrice}</Text>
            )}
          </View>
          
          <Text style={styles.name}>{product.name}</Text>
          
          {/* Rating section if available */}
          {product.rating && (
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <AntDesign 
                    key={star}
                    name={star <= product.rating ? "star" : "staro"} 
                    size={16} 
                    color={star <= product.rating ? "#FFD700" : "#555"} 
                    style={styles.starIcon}
                  />
                ))}
              </View>
              <Text style={styles.reviewCount}>
                ({product.reviewCount || 0} reviews)
              </Text>
            </View>
          )}
          
          {/* Description Card */}
          <View style={styles.descriptionCard}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
          
          {/* Features Card */}
          {product.features && (
            <View style={styles.featuresCard}>
              <Text style={styles.sectionTitle}>Features</Text>
              {product.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <MaterialCommunityIcons name="check-circle" size={18} color="#00D166" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          )}
          
          {/* Specifications Card */}
          {product.specifications && (
            <View style={styles.specificationsCard}>
              <Text style={styles.sectionTitle}>Specifications</Text>
              {Object.entries(product.specifications).map(([key, value], index) => (
                <View key={index} style={styles.specificationItem}>
                  <Text style={styles.specKey}>{key}</Text>
                  <Text style={styles.specValue}>{value}</Text>
                </View>
              ))}
            </View>
          )}
          
          {/* Extra space for bottom bar */}
          <View style={{ height: 80 }} />
        </Animated.View>
      </Animated.ScrollView>
      
      {/* Added to Cart Notification */}
      <Animated.View style={[styles.cartNotification, { opacity: fadeAnim }]}>
        <Ionicons name="checkmark-circle" size={24} color="#00D166" />
        <Text style={styles.cartNotificationText}>Added to Cart</Text>
      </Animated.View>
      
      {/* Bottom Bar without BlurView */}
      <View style={styles.bottomBarContainer}>
        <View style={styles.bottomBar}>
          <View style={styles.quantitySelector}>
            <TouchableOpacity 
              style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]} 
              onPress={decrementQuantity}
              disabled={quantity <= 1}
            >
              <AntDesign name="minus" size={16} color={quantity <= 1 ? "#555" : "#fff"} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.quantityButton} 
              onPress={incrementQuantity}
            >
              <AntDesign name="plus" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.cartButton}
              activeOpacity={0.8}
              onPress={addToCart}
            >
              <Ionicons name="cart-outline" size={20} color="#fff" />
              <Text style={styles.cartButtonText}>Add to Cart</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.buyButton}
              activeOpacity={0.8}
              onPress={buyNow}
            >
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: 'rgba(18, 18, 18, 0.95)',
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    maxWidth: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    zIndex: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  backButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  shareButton: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageContainer: {
    height: 380,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A1A1A',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
    paddingTop: 60,
  },
  image: { 
    width: '90%',
    height: '90%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 80,
    right: 20,
    padding: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 2,
  },
  discountBadge: {
    position: 'absolute',
    top: 80,
    left: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    zIndex: 2,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailsContainer: {
    marginTop: -30,
    marginHorizontal: 15,
    paddingBottom: 20,
  },
  priceTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  price: { 
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#00D166',
  },
  originalPrice: {
    fontSize: 16,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  name: { 
    fontSize: 28, 
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    marginRight: 3,
  },
  reviewCount: {
    marginLeft: 5,
    fontSize: 14,
    color: '#aaa',
  },
  descriptionCard: {
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  featuresCard: {
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  specificationsCard: {
    backgroundColor: '#222',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#bbb',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  featureText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#bbb',
  },
  specificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  specKey: {
    fontSize: 15,
    color: '#888',
  },
  specValue: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '500',
  },
  cartNotification: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartNotificationText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomBar: {
    backgroundColor: 'rgba(18, 18, 18, 0.95)',
    paddingTop: 15,
    paddingBottom: 25, // Extra padding for bottom
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    // Adding shadow for floating effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 10,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  quantityButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  quantityButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  quantityText: {
    paddingHorizontal: 15,
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  actionButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 15,
  },
  cartButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 5,
  },
  buyButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});