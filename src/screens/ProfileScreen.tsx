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

export default function ProfileScreen() {
  const navigation = useNavigation();

  const menuItems = [
    { id: 1, title: 'Orders', icon: 'bag-outline', onPress: () => navigation.navigate('OrderTracking' as never) },
    { id: 2, title: 'Reservations', icon: 'calendar-outline', onPress: () => navigation.navigate('ReserveInStore' as never) },
    { id: 3, title: 'Style Profile', icon: 'star-outline', onPress: () => {} },
    { id: 4, title: 'Saved Items', icon: 'heart-outline', onPress: () => {} },
    { id: 5, title: 'Addresses', icon: 'location-outline', onPress: () => {} },
    { id: 6, title: 'Payment Methods', icon: 'card-outline', onPress: () => {} },
    { id: 7, title: 'Settings', icon: 'settings-outline', onPress: () => {} },
    { id: 8, title: 'Help & Support', icon: 'help-circle-outline', onPress: () => {} },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <LinearGradient
        colors={['#000000', '#1a1a1a']}
        style={styles.header}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View>

        {/* Loyalty Card */}
        <View style={styles.loyaltyCard}>
          <View style={styles.loyaltyHeader}>
            <Text style={styles.loyaltyTier}>Gold Member</Text>
            <Ionicons name="star" size={20} color="#FFD700" />
          </View>
          <View style={styles.loyaltyStats}>
            <View style={styles.loyaltyStat}>
              <Text style={styles.loyaltyStatValue}>2,450</Text>
              <Text style={styles.loyaltyStatLabel}>Reward Points</Text>
            </View>
            <View style={styles.loyaltyDivider} />
            <View style={styles.loyaltyStat}>
              <Text style={styles.loyaltyStatValue}>₹12,500</Text>
              <Text style={styles.loyaltyStatLabel}>Yearly Savings</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Style Profile Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Style Profile</Text>
        <View style={styles.styleProfileCard}>
          <View style={styles.styleItem}>
            <Text style={styles.styleLabel}>Preferred Fits</Text>
            <Text style={styles.styleValue}>Regular, Slim</Text>
          </View>
          <View style={styles.styleItem}>
            <Text style={styles.styleLabel}>Favorite Colors</Text>
            <Text style={styles.styleValue}>Black, Navy, White</Text>
          </View>
          <View style={styles.styleItem}>
            <Text style={styles.styleLabel}>Preferred Brands</Text>
            <Text style={styles.styleValue}>Allen Solly, Van Heusen</Text>
          </View>
        </View>
      </View>

      {/* Activity Across Channels */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity</Text>
        <View style={styles.activityCard}>
          <View style={styles.activityItem}>
            <Ionicons name="phone-portrait-outline" size={24} color="#000000" />
            <View style={styles.activityDetails}>
              <Text style={styles.activityTitle}>App Orders</Text>
              <Text style={styles.activityCount}>12 orders</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Ionicons name="chatbubbles-outline" size={24} color="#000000" />
            <View style={styles.activityDetails}>
              <Text style={styles.activityTitle}>WhatsApp</Text>
              <Text style={styles.activityCount}>5 orders</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <Ionicons name="business-outline" size={24} color="#000000" />
            <View style={styles.activityDetails}>
              <Text style={styles.activityTitle}>In-Store</Text>
              <Text style={styles.activityCount}>8 purchases</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.section}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <Ionicons name={item.icon as any} size={24} color="#000000" />
            <Text style={styles.menuItemText}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={20} color="#8E8E93" />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  loyaltyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  loyaltyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  loyaltyTier: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  loyaltyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  loyaltyStat: {
    alignItems: 'center',
  },
  loyaltyStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  loyaltyStatLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  loyaltyDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },
  styleProfileCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
  },
  styleItem: {
    marginBottom: 15,
  },
  styleLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  styleValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  activityCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  activityDetails: {
    marginLeft: 15,
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  activityCount: {
    fontSize: 14,
    color: '#8E8E93',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    marginLeft: 15,
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF3B30',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
  },
});

