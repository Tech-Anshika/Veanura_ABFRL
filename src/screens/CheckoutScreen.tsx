import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CheckoutScreen() {
  const navigation = useNavigation();
  const [selectedPayment, setSelectedPayment] = useState('UPI');
  const [promoCode, setPromoCode] = useState('');

  const paymentMethods = [
    { id: 'UPI', name: 'UPI', icon: 'phone-portrait-outline' },
    { id: 'Card', name: 'Credit/Debit Card', icon: 'card-outline' },
    { id: 'GiftCard', name: 'Gift Card', icon: 'gift-outline' },
    { id: 'PayInStore', name: 'Pay in Store', icon: 'business-outline' },
  ];

  const appliedOffers = [
    { id: 1, name: 'Welcome Offer', discount: 500 },
    { id: 2, name: 'Loyalty Discount', discount: 200 },
  ];

  const subtotal = 7998;
  const discount = appliedOffers.reduce((sum, offer) => sum + offer.discount, 0);
  const total = subtotal - discount;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Ionicons name="location" size={20} color="#000000" />
              <Text style={styles.addressName}>Home</Text>
            </View>
            <Text style={styles.addressText}>
              123 Fashion Street{'\n'}Mumbai, Maharashtra 400001
            </Text>
            <TouchableOpacity style={styles.changeAddressButton}>
              <Text style={styles.changeAddressText}>Change Address</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>₹{subtotal.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery</Text>
              <Text style={[styles.summaryValue, styles.freeText]}>FREE</Text>
            </View>
            {appliedOffers.map((offer) => (
              <View key={offer.id} style={styles.summaryRow}>
                <View style={styles.offerRow}>
                  <Ionicons name="pricetag" size={16} color="#34C759" />
                  <Text style={styles.offerName}>{offer.name}</Text>
                </View>
                <Text style={[styles.summaryValue, styles.discountValue]}>
                  -₹{offer.discount}
                </Text>
              </View>
            ))}
            <View style={styles.divider} />
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, styles.totalLabel]}>Total</Text>
              <Text style={[styles.summaryValue, styles.totalValue]}>
                ₹{total.toLocaleString()}
              </Text>
            </View>
            <View style={styles.savingsRow}>
              <Ionicons name="checkmark-circle" size={16} color="#34C759" />
              <Text style={styles.savingsText}>
                You saved ₹{discount.toLocaleString()}!
              </Text>
            </View>
          </View>
        </View>

        {/* Promo Code */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Promo Code</Text>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
              placeholderTextColor="#8E8E93"
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedPayment === method.id && styles.paymentMethodActive,
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <Ionicons
                name={method.icon as any}
                size={24}
                color={selectedPayment === method.id ? '#000000' : '#8E8E93'}
              />
              <Text
                style={[
                  styles.paymentMethodText,
                  selectedPayment === method.id && styles.paymentMethodTextActive,
                ]}
              >
                {method.name}
              </Text>
              <View style={styles.radioButton}>
                {selectedPayment === method.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{total.toLocaleString()}</Text>
        </View>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={() => {
            // Handle order placement
            navigation.navigate('OrderTracking' as never);
          }}
        >
          <LinearGradient
            colors={['#000000', '#1a1a1a']}
            style={styles.placeOrderGradient}
          >
            <Text style={styles.placeOrderText}>Place Order</Text>
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
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  addressCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addressName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#8E8E93',
    lineHeight: 20,
    marginBottom: 10,
  },
  changeAddressButton: {
    alignSelf: 'flex-start',
  },
  changeAddressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  summaryCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  freeText: {
    color: '#34C759',
  },
  offerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerName: {
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 6,
  },
  discountValue: {
    color: '#34C759',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  savingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  savingsText: {
    fontSize: 14,
    color: '#34C759',
    marginLeft: 6,
    fontWeight: '600',
  },
  promoContainer: {
    flexDirection: 'row',
  },
  promoInput: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000000',
    marginRight: 10,
  },
  applyButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#000000',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginBottom: 10,
  },
  paymentMethodActive: {
    borderColor: '#000000',
    backgroundColor: '#F5F5F5',
  },
  paymentMethodText: {
    flex: 1,
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 12,
  },
  paymentMethodTextActive: {
    color: '#000000',
    fontWeight: '600',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000000',
  },
  bottomActions: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  placeOrderButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  placeOrderGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  placeOrderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

