/**
 * HomeScreen Component
 * Main dashboard screen displaying featured categories, trending products,
 * and quick action buttons for omnichannel retail features
 */

import React from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ABFRLColors } from '../theme/colors';

// Product image assets
const classicWhiteShirtSource = Image.resolveAssetSource(require('../../assets/ClassicWhiteShirt.png'));
const denimJacketSource = Image.resolveAssetSource(require('../../assets/DenimJacket.png'));
const sneakersSource = Image.resolveAssetSource(require('../../assets/Sneakers.png'));

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  const featuredCategories = [
    { id: 1, name: 'Men', icon: 'shirt-outline', color: ABFRLColors.primary },
    { id: 2, name: 'Women', icon: 'shirt-outline', color: ABFRLColors.primary },
    { id: 3, name: 'Kids', icon: 'happy-outline', color: ABFRLColors.primary },
    { id: 4, name: 'Accessories', icon: 'watch-outline', color: ABFRLColors.primary },
  ];

  const trendingProducts = [
    {
      id: 1,
      name: 'Classic White Shirt',
      price: 2999,
      discount: 20,
      image: classicWhiteShirtSource,
    },
    {
      id: 2,
      name: 'Denim Jacket',
      price: 4999,
      discount: 15,
      image: denimJacketSource,
    },
    {
      id: 3,
      name: 'Sneakers',
      price: 3999,
      discount: 25,
      image: sneakersSource,
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: 'AI Chat',
      icon: 'chatbubbles',
      onPress: () => navigation.navigate('AI Assistant' as never),
    },
    {
      id: 2,
      title: 'Reserve In-Store',
      icon: 'business',
      onPress: () => navigation.navigate('ReserveInStore' as never),
    },
    {
      id: 3,
      title: 'Track Order',
      icon: 'location',
      onPress: () => navigation.navigate('OrderTracking' as never),
    },
    {
      id: 4,
      title: 'Offers',
      icon: 'pricetag',
      onPress: () => {},
    },
    {
      id: 5,
      title: 'Cart',
      icon: 'cart',
      onPress: () => navigation.navigate('Cart' as never),
    },
    {
      id: 6,
      title: 'Style Quiz',
      icon: 'star',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={[ABFRLColors.primary, ABFRLColors.primaryLight]}
          style={styles.headerGradient}
        >
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Hello, Welcome!</Text>
              <Text style={styles.aiPrompt}>How can I help you today?</Text>
            </View>
            <TouchableOpacity
              style={styles.aiButton}
              onPress={() => navigation.navigate('AI Assistant' as never)}
            >
              <Ionicons name="chatbubble-ellipses" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Featured Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {featuredCategories.map((category) => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryIcon}>
                  <Ionicons name={category.icon as any} size={32} color={category.color} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Omnichannel Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={action.onPress}
              >
                <View style={styles.quickActionIconContainer}>
                  <Ionicons name={action.icon as any} size={28} color={ABFRLColors.primary} />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending Now</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {trendingProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => navigation.navigate('ProductDetails' as never, { product } as never)}
              >
                <View style={styles.productImageContainer}>
                  <Image
                    source={typeof product.image === 'string' ? { uri: product.image } : product.image}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                  {product.discount > 0 && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>{product.discount}% OFF</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.productName}>{product.name}</Text>
                <View style={styles.productPriceRow}>
                  <Text style={styles.productPrice}>₹{product.price}</Text>
                  {product.discount > 0 && (
                    <Text style={styles.originalPrice}>
                      ₹{Math.round(product.price / (1 - product.discount / 100))}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ABFRLColors.background,
  },
  headerGradient: {
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: ABFRLColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  aiPrompt: {
    fontSize: 14,
    color: '#E8F4F8',
    fontWeight: '300',
  },
  aiButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: ABFRLColors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: ABFRLColors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: ABFRLColors.textPrimary,
    paddingHorizontal: 20,
    marginBottom: 15,
    letterSpacing: -0.3,
  },
  seeAll: {
    fontSize: 14,
    color: ABFRLColors.primary,
    fontWeight: '600',
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 20,
    width: 80,
  },
  categoryIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: ABFRLColors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: ABFRLColors.border,
  },
  categoryName: {
    fontSize: 12,
    color: ABFRLColors.textPrimary,
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 3,
    height: 110,
    backgroundColor: ABFRLColors.surface,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: ABFRLColors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionIconContainer: {
    marginBottom: 4,
  },
  quickActionText: {
    fontSize: 12,
    color: ABFRLColors.textPrimary,
    marginTop: 4,
    fontWeight: '600',
  },
  productCard: {
    width: 160,
    marginLeft: 20,
  },
  productImageContainer: {
    width: 160,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: ABFRLColors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: ABFRLColors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  productName: {
    fontSize: 14,
    color: ABFRLColors.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: ABFRLColors.primary,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: ABFRLColors.textSecondary,
    textDecorationLine: 'line-through',
  },
});

