/**
 * ProductDetailsScreen Component
 * Detailed product view with image slider, size/color selection,
 * AR Try-On, store availability, and AI-powered recommendations
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Product image assets
const classicWhiteShirtSource = Image.resolveAssetSource(require('../../assets/ClassicWhiteShirt.png'));
const denimJacketSource = Image.resolveAssetSource(require('../../assets/DenimJacket.png'));

const { width } = Dimensions.get('window');

export default function ProductDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const product = route.params?.product || {
    id: 1,
    name: 'Classic White Shirt',
    price: 2999,
    originalPrice: 3749,
    discount: 20,
    images: [
      classicWhiteShirtSource,
      classicWhiteShirtSource,
      classicWhiteShirtSource,
    ],
  };

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('White');
  const [quantity, setQuantity] = useState(1);
  const [imageIndex, setImageIndex] = useState(0);

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['White', 'Black', 'Navy', 'Grey'];

  const similarProducts = [
    {
      id: 2,
      name: 'Denim Jacket',
      price: 4999,
      image: denimJacketSource,
    },
    {
      id: 3,
      name: 'Casual Shirt',
      price: 2499,
      image: classicWhiteShirtSource,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Slider */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const index = Math.round(event.nativeEvent.contentOffset.x / width);
              setImageIndex(index);
            }}
            scrollEventThrottle={16}
          >
            {product.images?.map((image: any, index: number) => (
              <Image
                key={index}
                source={typeof image === 'string' ? { uri: image } : image}
                style={[styles.productImage, { width }]}
                resizeMode="cover"
              />
            )) || (
              <Image
                source={product.image || classicWhiteShirtSource}
                style={[styles.productImage, { width }]}
                resizeMode="cover"
              />
            )}
          </ScrollView>
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {(product.images || [product.image || '']).map((_, index) => (
              <View
                key={index}
                style={[styles.dot, imageIndex === index && styles.activeDot]}
              />
            ))}
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>₹{product.price}</Text>
            {product.originalPrice && (
              <>
                <Text style={styles.originalPrice}>₹{product.originalPrice}</Text>
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>
                    {product.discount || Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Text>
                </View>
              </>
            )}
          </View>
          <View style={styles.loyaltyPoints}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.loyaltyText}>Earn 30 loyalty points on purchase</Text>
          </View>

          {/* Size Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Size</Text>
            <View style={styles.sizeContainer}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.sizeButtonActive,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.sizeTextActive,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Color Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select Color</Text>
            <View style={styles.colorContainer}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton,
                    selectedColor === color && styles.colorButtonActive,
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  <View
                    style={[
                      styles.colorCircle,
                      { backgroundColor: color.toLowerCase() === 'white' ? '#FFFFFF' : color.toLowerCase() === 'black' ? '#000000' : color.toLowerCase() === 'navy' ? '#001f3f' : '#808080' },
                    ]}
                  />
                  <Text
                    style={[
                      styles.colorText,
                      selectedColor === color && styles.colorTextActive,
                    ]}
                  >
                    {color}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Store Availability */}
          <View style={styles.section}>
            <View style={styles.storeAvailability}>
              <Ionicons name="location" size={20} color="#34C759" />
              <View style={styles.storeInfo}>
                <Text style={styles.storeTitle}>Available at nearest store</Text>
                <Text style={styles.storeAddress}>123 Fashion Street, Mumbai</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.checkStockText}>Check Stock</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* AI Smart Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Smart Actions</Text>
            <View style={styles.aiActions}>
              <TouchableOpacity style={styles.aiActionButton}>
                <Ionicons name="chatbubble-outline" size={20} color="#000000" />
                <Text style={styles.aiActionText}>Ask AI about size</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.aiActionButton}>
                <Ionicons name="swap-horizontal-outline" size={20} color="#000000" />
                <Text style={styles.aiActionText}>Compare</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.aiActionButton}>
                <Ionicons name="cube-outline" size={20} color="#000000" />
                <Text style={styles.aiActionText}>Check Stock</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* AR Try-On Button */}
          <TouchableOpacity style={styles.arButton}>
            <LinearGradient
              colors={['#000000', '#1a1a1a']}
              style={styles.arGradient}
            >
              <Ionicons name="camera" size={24} color="#FFFFFF" />
              <Text style={styles.arButtonText}>AR Try-On</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Similar Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Similar Items</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similarProducts.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.similarProductCard}
                  onPress={() => navigation.navigate('ProductDetails' as never, { product: item } as never)}
                >
                  <Image
                    source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                    style={styles.similarProductImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.similarProductName}>{item.name}</Text>
                  <Text style={styles.similarProductPrice}>₹{item.price}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Complete the Look */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Complete the Look</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similarProducts.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.similarProductCard}
                  onPress={() => navigation.navigate('ProductDetails' as never, { product: item } as never)}
                >
                  <Image
                    source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                    style={styles.similarProductImage}
                    resizeMode="cover"
                  />
                  <Text style={styles.similarProductName}>{item.name}</Text>
                  <Text style={styles.similarProductPrice}>₹{item.price}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={() => navigation.navigate('Checkout' as never)}
        >
          <LinearGradient
            colors={['#000000', '#1a1a1a']}
            style={styles.buyNowGradient}
          >
            <Text style={styles.buyNowText}>Buy Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  imageContainer: {
    height: 400,
    position: 'relative',
  },
  productImage: {
    width: width,
    height: 400,
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#000000',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 18,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  loyaltyPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  loyaltyText: {
    fontSize: 14,
    color: '#8E8E93',
    marginLeft: 6,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeButton: {
    width: 50,
    height: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  sizeButtonActive: {
    borderColor: '#000000',
    backgroundColor: '#000000',
  },
  sizeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  sizeTextActive: {
    color: '#FFFFFF',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  colorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginRight: 10,
    marginBottom: 10,
  },
  colorButtonActive: {
    borderColor: '#000000',
  },
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  colorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  colorTextActive: {
    fontWeight: 'bold',
  },
  storeAvailability: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 12,
  },
  storeInfo: {
    flex: 1,
    marginLeft: 10,
  },
  storeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  storeAddress: {
    fontSize: 12,
    color: '#8E8E93',
  },
  checkStockText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  aiActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  aiActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginRight: 10,
    marginBottom: 10,
  },
  aiActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 8,
  },
  arButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 30,
  },
  arGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  arButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  similarProductCard: {
    width: 150,
    marginRight: 15,
  },
  similarProductImage: {
    width: 150,
    height: 180,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
  },
  similarProductName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  similarProductPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  bottomActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  addToCartButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#000000',
    alignItems: 'center',
    marginRight: 10,
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  buyNowButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buyNowGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buyNowText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

