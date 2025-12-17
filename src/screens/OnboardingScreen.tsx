import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ABFRLColors } from '../theme/colors';

const { width } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const slides = [
    {
      title: 'Omnichannel AI Assistant',
      description: 'Get personalized shopping assistance across online and in-store experiences',
      icon: 'chatbubbles',
    },
    {
      title: 'Personalized Shopping',
      description: 'Discover products tailored to your style preferences and shopping history',
      icon: 'star',
    },
    {
      title: 'Reserve In-Store',
      description: 'Reserve items online and pick them up at your nearest store with ease',
      icon: 'business',
    },
  ];

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View key={index} style={[styles.slide, { width }]}>
            <View style={styles.iconContainer}>
              <LinearGradient
                colors={[ABFRLColors.primary, ABFRLColors.primaryLight]}
                style={styles.iconGradient}
              >
                <Ionicons name={slide.icon as any} size={60} color="#FFFFFF" />
              </LinearGradient>
            </View>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.guestButton}
          onPress={() => {
            onComplete();
            navigation.navigate('MainTabs' as never);
          }}
        >
          <Text style={styles.guestButtonText}>Continue as Guest</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            onComplete();
            navigation.navigate('MainTabs' as never);
          }}
        >
          <LinearGradient
            colors={[ABFRLColors.primary, ABFRLColors.primaryLight]}
            style={styles.loginGradient}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ABFRLColors.background,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  skipText: {
    fontSize: 16,
    color: ABFRLColors.textSecondary,
    fontWeight: '600',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconGradient: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: ABFRLColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: ABFRLColors.textPrimary,
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    color: ABFRLColors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    position: 'absolute',
    bottom: 150,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    backgroundColor: ABFRLColors.border,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: ABFRLColors.primary,
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  guestButton: {
    paddingVertical: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: ABFRLColors.primary,
    backgroundColor: ABFRLColors.background,
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: ABFRLColors.primary,
    textAlign: 'center',
  },
  loginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: ABFRLColors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginGradient: {
    paddingVertical: 16,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

