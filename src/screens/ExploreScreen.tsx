import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import product images
const classicWhiteShirtSource = Image.resolveAssetSource(require('../../assets/ClassicWhiteShirt.png'));
const denimJacketSource = Image.resolveAssetSource(require('../../assets/DenimJacket.png'));
const sneakersSource = Image.resolveAssetSource(require('../../assets/Sneakers.png'));

export default function ExploreScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'Men', 'Women', 'Kids', 'Sale', 'New Arrivals'];
  const [selectedFilter, setSelectedFilter] = useState('All');

  const products = [
    {
      id: 1,
      name: 'Classic White Shirt',
      price: 2999,
      discount: 20,
      image: classicWhiteShirtSource,
      category: 'Men',
    },
    {
      id: 2,
      name: 'Denim Jacket',
      price: 4999,
      discount: 15,
      image: denimJacketSource,
      category: 'Men',
    },
    {
      id: 3,
      name: 'Floral Dress',
      price: 3999,
      discount: 25,
      image: 'https://via.placeholder.com/150',
      category: 'Women',
    },
    {
      id: 4,
      name: 'Sneakers',
      price: 3999,
      discount: 25,
      image: sneakersSource,
      category: 'Men',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, brands..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8E8E93"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterChip,
              selectedFilter === filter && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products Grid */}
      <ScrollView style={styles.productsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {products.map((product) => (
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
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  filtersContainer: {
    marginBottom: 20,
  },
  filtersContent: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: '#000000',
  },
  filterText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  productsContainer: {
    flex: 1,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  productCard: {
    width: '48%',
    margin: '1%',
    marginBottom: 20,
  },
  productImageContainer: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF3B30',
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
    color: '#000000',
    fontWeight: '500',
    marginBottom: 4,
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
  },
});



