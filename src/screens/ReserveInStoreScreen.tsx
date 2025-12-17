import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ReserveInStoreScreen() {
  const navigation = useNavigation();
  const [selectedStore, setSelectedStore] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const stores = [
    {
      id: 1,
      name: 'ABFRL Store - Bandra',
      address: '123 Fashion Street, Bandra West, Mumbai',
      distance: '2.5 km',
      phone: '+91 98765 43210',
    },
    {
      id: 2,
      name: 'ABFRL Store - Andheri',
      address: '456 Style Avenue, Andheri West, Mumbai',
      distance: '5.2 km',
      phone: '+91 98765 43211',
    },
  ];

  const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];

  const reservedItems = [
    { id: 1, name: 'Classic White Shirt', size: 'M', color: 'White' },
    { id: 2, name: 'Denim Jacket', size: 'L', color: 'Blue' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reserve In-Store</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Reserved Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reserved Items</Text>
          {reservedItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>
                  Size: {item.size} | Color: {item.color}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Store Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Store</Text>
          {stores.map((store, index) => (
            <TouchableOpacity
              key={store.id}
              style={[
                styles.storeCard,
                selectedStore === index && styles.storeCardActive,
              ]}
              onPress={() => setSelectedStore(index)}
            >
              <View style={styles.storeHeader}>
                <View style={styles.storeInfo}>
                  <Text style={styles.storeName}>{store.name}</Text>
                  <Text style={styles.storeAddress}>{store.address}</Text>
                  <Text style={styles.storeDistance}>{store.distance} away</Text>
                </View>
                <View style={styles.radioButton}>
                  {selectedStore === index && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </View>
              <View style={styles.storeActions}>
                <TouchableOpacity style={styles.storeActionButton}>
                  <Ionicons name="call-outline" size={18} color="#000000" />
                  <Text style={styles.storeActionText}>Call</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.storeActionButton}>
                  <Ionicons name="navigate-outline" size={18} color="#000000" />
                  <Text style={styles.storeActionText}>Directions</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[0, 1, 2, 3, 4, 5, 6].map((day) => {
              const date = new Date();
              date.setDate(date.getDate() + day);
              const dateStr = date.toISOString().split('T')[0];
              const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
              const dayNum = date.getDate();

              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dateCard,
                    selectedDate === dateStr && styles.dateCardActive,
                  ]}
                  onPress={() => setSelectedDate(dateStr)}
                >
                  <Text
                    style={[
                      styles.dayName,
                      selectedDate === dateStr && styles.dayNameActive,
                    ]}
                  >
                    {dayName}
                  </Text>
                  <Text
                    style={[
                      styles.dayNum,
                      selectedDate === dateStr && styles.dayNumActive,
                    ]}
                  >
                    {dayNum}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.timeSlotActive,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeText,
                    selectedTime === time && styles.timeTextActive,
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Store Staff Info */}
        {selectedStore !== null && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Store Associate</Text>
            <View style={styles.staffCard}>
              <View style={styles.staffAvatar}>
                <Ionicons name="person" size={30} color="#FFFFFF" />
              </View>
              <View style={styles.staffInfo}>
                <Text style={styles.staffName}>Rajesh Kumar</Text>
                <Text style={styles.staffRole}>Senior Style Consultant</Text>
                <Text style={styles.staffRating}>
                  <Ionicons name="star" size={14} color="#FFD700" /> 4.8 (120 reviews)
                </Text>
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.reserveButton}
          disabled={!selectedDate || !selectedTime}
          onPress={() => {
            // Handle reservation
            alert('Reservation confirmed!');
          }}
        >
          <LinearGradient
            colors={
              selectedDate && selectedTime
                ? ['#000000', '#1a1a1a']
                : ['#E5E5EA', '#E5E5EA']
            }
            style={styles.reserveGradient}
          >
            <Text
              style={[
                styles.reserveButtonText,
                (!selectedDate || !selectedTime) && styles.reserveButtonTextDisabled,
              ]}
            >
              Confirm Reservation
            </Text>
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
  itemCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 14,
    color: '#8E8E93',
  },
  storeCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  storeCardActive: {
    borderColor: '#000000',
  },
  storeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  storeInfo: {
    flex: 1,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  storeAddress: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  storeDistance: {
    fontSize: 12,
    color: '#8E8E93',
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
  storeActions: {
    flexDirection: 'row',
  },
  storeActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginRight: 10,
  },
  storeActionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginLeft: 6,
  },
  dateCard: {
    width: 70,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  dateCardActive: {
    borderColor: '#000000',
    backgroundColor: '#000000',
  },
  dayName: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  dayNameActive: {
    color: '#FFFFFF',
  },
  dayNum: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  dayNumActive: {
    color: '#FFFFFF',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timeSlot: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  timeSlotActive: {
    borderColor: '#000000',
    backgroundColor: '#000000',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
  },
  timeTextActive: {
    color: '#FFFFFF',
  },
  staffCard: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
  },
  staffAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  staffInfo: {
    flex: 1,
  },
  staffName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  staffRole: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  staffRating: {
    fontSize: 12,
    color: '#8E8E93',
  },
  bottomActions: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  reserveButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  reserveGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  reserveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  reserveButtonTextDisabled: {
    color: '#8E8E93',
  },
});




