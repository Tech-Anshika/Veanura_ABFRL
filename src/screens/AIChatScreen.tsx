/**
 * AIChatScreen Component
 * AI-powered conversational shopping assistant
 * Provides product recommendations, answers queries, and handles
 * post-purchase support through natural language interactions
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Product image assets for recommendations
const classicWhiteShirtSource = Image.resolveAssetSource(require('../../assets/ClassicWhiteShirt.png'));
const denimJacketSource = Image.resolveAssetSource(require('../../assets/DenimJacket.png'));

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  productRecommendations?: Product[];
  complementaryItems?: Product[];
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: any;
  discount?: number;
}

export default function AIChatScreen() {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI shopping assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Classic White Shirt',
      price: 2999,
      image: classicWhiteShirtSource,
      discount: 20,
    },
    {
      id: 2,
      name: 'Denim Jacket',
      price: 4999,
      image: denimJacketSource,
      discount: 15,
    },
  ];

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Based on your preferences, I've found some great options for you!",
        isUser: false,
        timestamp: new Date(),
        productRecommendations: mockProducts,
        complementaryItems: mockProducts,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Assistant</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View key={message.id}>
            <View
              style={[
                styles.messageBubble,
                message.isUser ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.isUser ? styles.userMessageText : styles.aiMessageText,
                ]}
              >
                {message.text}
              </Text>
            </View>

            {message.productRecommendations && (
              <View style={styles.recommendationsContainer}>
                <Text style={styles.recommendationsTitle}>Recommended for You</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {message.productRecommendations.map((product) => (
                    <TouchableOpacity
                      key={product.id}
                      style={styles.productCard}
                      onPress={() =>
                        navigation.navigate('ProductDetails' as never, { product } as never)
                      }
                    >
                      <Image
                        source={typeof product.image === 'string' ? { uri: product.image } : product.image}
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                      <Text style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <Text style={styles.productPrice}>₹{product.price}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}

            {message.complementaryItems && (
              <View style={styles.recommendationsContainer}>
                <Text style={styles.recommendationsTitle}>Complete the Look</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {message.complementaryItems.map((product) => (
                    <TouchableOpacity
                      key={product.id}
                      style={styles.productCard}
                      onPress={() =>
                        navigation.navigate('ProductDetails' as never, { product } as never)
                      }
                    >
                      <Image
                        source={typeof product.image === 'string' ? { uri: product.image } : product.image}
                        style={styles.productImage}
                        resizeMode="cover"
                      />
                      <Text style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <Text style={styles.productPrice}>₹{product.price}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me anything..."
          value={inputText}
          onChangeText={setInputText}
          multiline
          placeholderTextColor="#8E8E93"
        />
        <TouchableOpacity
          style={[styles.sendButton, inputText.trim() === '' && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={inputText.trim() === ''}
        >
          <Ionicons
            name="send"
            size={20}
            color={inputText.trim() === '' ? '#8E8E93' : '#FFFFFF'}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#000000',
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F5F5F5',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  aiMessageText: {
    color: '#000000',
  },
  recommendationsContainer: {
    marginTop: 15,
    marginBottom: 20,
  },
  recommendationsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  productCard: {
    width: 140,
    marginRight: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#E5E5EA',
  },
  productName: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
    padding: 8,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000000',
    maxHeight: 100,
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E5E5EA',
  },
});



