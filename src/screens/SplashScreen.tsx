import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ABFRLColors } from '../theme/colors';

export default function SplashScreen() {
  return (
    <LinearGradient
      colors={[ABFRLColors.primary, ABFRLColors.primaryDark]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>VENAURA</Text>
          <View style={styles.accentLine} />
        </View>
        <Text style={styles.tagline}>AI Retail Companion</Text>
        <View style={styles.brandContainer}>
          <Text style={styles.brand}>ABFRL</Text>
          <View style={styles.goldDot} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 52,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 6,
    marginBottom: 12,
  },
  accentLine: {
    width: 80,
    height: 4,
    backgroundColor: ABFRLColors.accent,
    borderRadius: 2,
  },
  tagline: {
    fontSize: 18,
    color: '#E8F4F8',
    letterSpacing: 1.5,
    marginBottom: 40,
    fontWeight: '300',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brand: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 2,
    marginRight: 12,
  },
  goldDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: ABFRLColors.accent,
  },
});

