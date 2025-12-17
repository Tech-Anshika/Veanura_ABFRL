import React from 'react';
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

export default function OrderTrackingScreen() {
  const navigation = useNavigation();

  const order = {
    id: 'ORD123456',
    status: 'Shipped',
    estimatedDelivery: '2024-01-15',
    items: [
      {
        id: 1,
        name: 'Classic White Shirt',
        price: 2999,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
      },
      {
        id: 2,
        name: 'Denim Jacket',
        price: 4999,
        quantity: 1,
        image: 'https://via.placeholder.com/100',
      },
    ],
    timeline: [
      { status: 'Order Placed', date: '2024-01-10', time: '10:30 AM', completed: true },
      { status: 'Confirmed', date: '2024-01-10', time: '10:35 AM', completed: true },
      { status: 'Processing', date: '2024-01-11', time: '2:00 PM', completed: true },
      { status: 'Shipped', date: '2024-01-12', time: '4:30 PM', completed: true },
      { status: 'Out for Delivery', date: '2024-01-15', time: '9:00 AM', completed: false },
      { status: 'Delivered', date: '', time: '', completed: false },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Tracking</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Order Status Card */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.orderId}>Order #{order.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: '#34C759' }]}>
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>
          <Text style={styles.estimatedDelivery}>
            Estimated Delivery: {order.estimatedDelivery}
          </Text>
        </View>

        {/* Timeline */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Timeline</Text>
          <View style={styles.timeline}>
            {order.timeline.map((step, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View
                    style={[
                      styles.timelineDot,
                      step.completed && styles.timelineDotCompleted,
                    ]}
                  >
                    {step.completed && (
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    )}
                  </View>
                  {index < order.timeline.length - 1 && (
                    <View
                      style={[
                        styles.timelineLine,
                        step.completed && styles.timelineLineCompleted,
                      ]}
                    />
                  )}
                </View>
                <View style={styles.timelineContent}>
                  <Text
                    style={[
                      styles.timelineStatus,
                      step.completed && styles.timelineStatusCompleted,
                    ]}
                  >
                    {step.status}
                  </Text>
                  {step.date && (
                    <Text style={styles.timelineDate}>
                      {step.date} at {step.time}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          {order.items.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.orderItemImage}
                resizeMode="cover"
              />
              <View style={styles.orderItemDetails}>
                <Text style={styles.orderItemName}>{item.name}</Text>
                <Text style={styles.orderItemQuantity}>Qty: {item.quantity}</Text>
                <Text style={styles.orderItemPrice}>₹{item.price}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#000000" />
            <Text style={styles.actionButtonText}>Chat with AI Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="return-down-back-outline" size={20} color="#000000" />
            <Text style={styles.actionButtonText}>Return/Exchange</Text>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle-outline" size={20} color="#000000" />
            <Text style={styles.actionButtonText}>Help & Support</Text>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>
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
  statusCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    margin: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  estimatedDelivery: {
    fontSize: 14,
    color: '#8E8E93',
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
    marginBottom: 20,
  },
  timeline: {
    marginLeft: 10,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 15,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineDotCompleted: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  timelineLine: {
    width: 2,
    height: 30,
    backgroundColor: '#E5E5EA',
    marginTop: 2,
  },
  timelineLineCompleted: {
    backgroundColor: '#34C759',
  },
  timelineContent: {
    flex: 1,
    paddingTop: 2,
  },
  timelineStatus: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 4,
  },
  timelineStatusCompleted: {
    color: '#000000',
  },
  timelineDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  orderItemImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginRight: 15,
  },
  orderItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  orderItemQuantity: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    marginBottom: 10,
  },
  actionButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 12,
  },
});




