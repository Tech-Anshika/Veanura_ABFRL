/**
 * Venaura - ABFRL Omnichannel Retail App
 * Main Application Entry Point
 * 
 * This file sets up the navigation structure for the entire application,
 * including splash screen, onboarding, main tabs, and modal screens.
 */

import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { View, ActivityIndicator } from 'react-native';

// Screen Components
import SplashScreen from './src/screens/SplashScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import AIChatScreen from './src/screens/AIChatScreen';
import CartScreen from './src/screens/CartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';
import ReserveInStoreScreen from './src/screens/ReserveInStoreScreen';
import OrderTrackingScreen from './src/screens/OrderTrackingScreen';
import InStoreModeScreen from './src/screens/InStoreModeScreen';

// Navigation instances
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * MainTabs Component
 * Bottom tab navigation for primary app sections
 */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'AI Assistant') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#003366',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="AI Assistant" component={AIChatScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

/**
 * Main App Component
 * Handles app initialization, splash screen, and navigation setup
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  // Show splash screen for 2 seconds on app launch
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator 
        screenOptions={{ headerShown: false }}
        initialRouteName="Onboarding"
      >
        <Stack.Screen name="Onboarding">
          {(props) => <OnboardingScreen {...props} onComplete={() => setHasSeenOnboarding(true)} />}
        </Stack.Screen>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetailsScreen}
          options={{ presentation: 'card' }}
        />
        <Stack.Screen 
          name="Checkout" 
          component={CheckoutScreen}
          options={{ presentation: 'card' }}
        />
        <Stack.Screen 
          name="ReserveInStore" 
          component={ReserveInStoreScreen}
          options={{ presentation: 'card' }}
        />
        <Stack.Screen 
          name="OrderTracking" 
          component={OrderTrackingScreen}
          options={{ presentation: 'card' }}
        />
        <Stack.Screen 
          name="InStoreMode" 
          component={InStoreModeScreen}
          options={{ presentation: 'card' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

