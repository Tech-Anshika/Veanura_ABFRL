import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Import product images
const classicWhiteShirtSource = Image.resolveAssetSource(require('../../assets/ClassicWhiteShirt.png'));
const denimJacketSource = Image.resolveAssetSource(require('../../assets/DenimJacket.png'));

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: any;
  size: string;
  color: string;
  quantity: number;
}

export default function CartScreen() {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Classic White Shirt',
      price: 2999,
      originalPrice: 3749,
      image: classicWhiteShirtSource,
      size: 'M',
      color: 'White',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Denim Jacket',
      price: 4999,
      originalPrice: 5882,
      image: denimJacketSource,
      size: 'L',
      color: 'Blue',
      quantity: 1,
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.itemCount}>{cartItems.length} items</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#E5E5EA" />
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home' as never)}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <Image
                  source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                  style={styles.itemImage}
                  resizeMode="cover"
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemAttributes}>
                    Size: {item.size} | Color: {item.color}
                  </Text>
                  <View style={styles.itemPriceRow}>
                    <Text style={styles.itemPrice}>₹{item.price}</Text>
                    <Text style={styles.itemOriginalPrice}>₹{item.originalPrice}</Text>
                  </View>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, -1)}
                    >
                      <Ionicons name="remove" size={18} color="#000000" />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <Ionicons name="add" size={18} color="#000000" />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <Ionicons name="trash-outline" size={20} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{subtotal.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={[styles.summaryValue, styles.discountValue]}>
                -₹{discount.toLocaleString()}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={[styles.summaryValue, styles.totalValue]}>
                ₹{total.toLocaleString()}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => navigation.navigate('Checkout' as never)}
            >
              <LinearGradient
                colors={['#000000', '#1a1a1a']}
                style={styles.checkoutGradient}
              >
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: '#8E8E93',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#8E8E93',
    marginTop: 20,
    marginBottom: 30,
  },
  shopButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000000',
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  itemsContainer: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  itemImage: {
    width: 100,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  itemAttributes: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 8,
  },
  itemPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginRight: 8,
  },
  itemOriginalPrice: {
    fontSize: 12,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginHorizontal: 15,
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    padding: 5,
  },
  summaryContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  discountValue: {
    color: '#34C759',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  checkoutGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});



