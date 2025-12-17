/**
 * InStoreModeScreen Component
 * Automatically activated when user enters physical store
 * Provides barcode scanning, stock checks, and store-specific features
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

export default function InStoreModeScreen() {
  const navigation = useNavigation();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [isInStore, setIsInStore] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required for in-store mode');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      // Simulate store detection
      setIsInStore(true);
    })();
  }, []);

  const storeInfo = {
    name: 'ABFRL Store - Bandra',
    address: '123 Fashion Street, Bandra West, Mumbai',
    staff: {
      name: 'Rajesh Kumar',
      role: 'Senior Style Consultant',
      phone: '+91 98765 43210',
    },
  };

  const quickActions = [
    {
      id: 1,
      title: 'Scan Barcode',
      icon: 'barcode-outline',
      onPress: () => {
        Alert.alert('Barcode Scanner', 'Camera will open to scan product barcode');
      },
    },
    {
      id: 2,
      title: 'Check Stock',
      icon: 'cube-outline',
      onPress: () => {
        Alert.alert('Stock Check', 'Checking availability...');
      },
    },
    {
      id: 3,
      title: 'Ask Store AI',
      icon: 'chatbubble-outline',
      onPress: () => {
        navigation.navigate('AI Assistant' as never);
      },
    },
    {
      id: 4,
      title: 'Call Associate',
      icon: 'call-outline',
      onPress: () => {
        Alert.alert('Call Associate', `Calling ${storeInfo.staff.name}...`);
      },
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>In-Store Mode</Text>
        <View style={{ width: 24 }} />
      </View>

      <LinearGradient
        colors={['#000000', '#1a1a1a']}
        style={styles.gradientBackground}
      >
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Store Info Card */}
          <View style={styles.storeCard}>
            <View style={styles.storeHeader}>
              <Ionicons name="business" size={32} color="#000000" />
              <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{storeInfo.name}</Text>
                <Text style={styles.storeAddress}>{storeInfo.address}</Text>
              </View>
            </View>
            {isInStore && (
              <View style={styles.inStoreBadge}>
                <Ionicons name="checkmark-circle" size={16} color="#34C759" />
                <Text style={styles.inStoreText}>You're in the store</Text>
              </View>
            )}
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionsGrid}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.id}
                  style={styles.actionCard}
                  onPress={action.onPress}
                >
                  <View style={styles.actionIconContainer}>
                    <Ionicons name={action.icon as any} size={32} color="#000000" />
                  </View>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Store Associate */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Store Associate</Text>
            <View style={styles.associateCard}>
              <View style={styles.associateAvatar}>
                <Ionicons name="person" size={30} color="#FFFFFF" />
              </View>
              <View style={styles.associateInfo}>
                <Text style={styles.associateName}>{storeInfo.staff.name}</Text>
                <Text style={styles.associateRole}>{storeInfo.staff.role}</Text>
                <View style={styles.associateActions}>
                  <TouchableOpacity style={styles.associateActionButton}>
                    <Ionicons name="call" size={18} color="#000000" />
                    <Text style={styles.associateActionText}>Call</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.associateActionButton}>
                    <Ionicons name="chatbubble" size={18} color="#000000" />
                    <Text style={styles.associateActionText}>Message</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>In-Store Features</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#34C759" />
                <Text style={styles.featureText}>Instant stock availability</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#34C759" />
                <Text style={styles.featureText}>Barcode scanning for product info</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#34C759" />
                <Text style={styles.featureText}>AI-powered recommendations</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#34C759" />
                <Text style={styles.featureText}>Direct connection to store staff</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  gradientBackground: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  storeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    marginBottom: 10,
  },
  storeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  storeInfo: {
    marginLeft: 15,
    flex: 1,
  },
  storeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  storeAddress: {
    fontSize: 14,
    color: '#8E8E93',
  },
  inStoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  inStoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34C759',
    marginLeft: 6,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
  },
  actionIconContainer: {
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
  },
  associateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
  },
  associateAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  associateInfo: {
    flex: 1,
  },
  associateName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  associateRole: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  associateActions: {
    flexDirection: 'row',
  },
  associateActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginRight: 10,
  },
  associateActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 6,
  },
  featuresList: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 10,
  },
});

