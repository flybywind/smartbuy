import React, { useState, useRef, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Animated
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// 定义消息类型
interface Message {
  id: number;
  type: 'system' | 'user' | 'assistant';
  content: string;
}

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      type: 'system', 
      content: '欢迎使用 SmartBuy 智能购物助手！请告诉我您想要购买什么商品，我会为您提供专业的购物建议。' 
    },
    { 
      id: 2, 
      type: 'user', 
      content: '我想买一条韩系风格的春装连衣裙，淑女风格，浅绿色，预算200元以内。' 
    },
    { 
      id: 3, 
      type: 'assistant', 
      content: '好的，我为您找到了几款符合条件的韩系春装连衣裙：\n\n1. 【甜美淑女风浅绿色针织连衣裙】\n价格：¥189\n特点：韩系设计，收腰显瘦，针织面料舒适透气\n\n2. 【春季新款淑女风格连衣裙】\n价格：¥168\n特点：浅绿色调，A字裙型，优雅大方\n\n3. 【韩版气质淑女连衣裙】\n价格：¥199\n特点：浅绿色，蕾丝拼接设计，清新淑女风\n\n您对哪一款更感兴趣？需要我提供更多详情或者其他款式吗？' 
    }
  ]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const inputHeight = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
        Animated.timing(inputHeight, {
          toValue: 80,
          duration: 300,
          useNativeDriver: false
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
        Animated.timing(inputHeight, {
          toValue: 50,
          duration: 300,
          useNativeDriver: false
        }).start();
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSend = () => {
    if (message.trim() === '') return;
    
    const newMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: message
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    // 模拟助手回复
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        type: 'assistant',
        content: '我正在为您寻找相关商品，请稍等...'
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const renderMessage = (msg: Message) => {
    switch (msg.type) {
      case 'system':
        return (
          <View key={msg.id} style={styles.systemMessageContainer}>
            <View style={styles.systemMessage}>
              <Text style={styles.systemMessageText}>{msg.content}</Text>
            </View>
          </View>
        );
      case 'user':
        return (
          <View key={msg.id} style={styles.userMessageContainer}>
            <View style={styles.userMessage}>
              <Text style={styles.userMessageText}>{msg.content}</Text>
            </View>
          </View>
        );
      case 'assistant':
        return (
          <View key={msg.id} style={styles.assistantMessageContainer}>
            <Image 
              source={require('../../assets/images/logo.svg')} 
              style={styles.assistantAvatar}
            />
            <View style={styles.assistantMessage}>
              <Text style={styles.assistantMessageText}>{msg.content}</Text>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SmartBuy 智能助手</Text>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map(msg => renderMessage(msg))}
      </ScrollView>
      
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <FontAwesome name="plus" size={20} color="#4a90e2" />
        </TouchableOpacity>
        
        <Animated.View style={[styles.inputWrapper, { height: inputHeight }]}>
          <TextInput
            style={styles.input}
            placeholder="输入您的购物需求..."
            value={message}
            onChangeText={setMessage}
            multiline
          />
        </Animated.View>
        
        <TouchableOpacity 
          style={[styles.sendButton, message.trim() ? styles.sendButtonActive : null]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <FontAwesome name="paper-plane" size={20} color={message.trim() ? "#fff" : "#ccc"} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 60,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#3a80d2',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  systemMessageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  systemMessage: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '80%',
  },
  systemMessageText: {
    fontSize: 14,
    color: '#666',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  userMessage: {
    backgroundColor: '#4a90e2',
    borderRadius: 16,
    borderBottomRightRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '80%',
  },
  userMessageText: {
    fontSize: 16,
    color: '#fff',
  },
  assistantMessageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  assistantAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  assistantMessage: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  assistantMessageText: {
    fontSize: 16,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  attachButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#4a90e2',
  },
}); 