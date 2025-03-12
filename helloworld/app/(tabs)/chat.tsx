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
  Animated,
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

// 定义消息类型
interface Message {
  id: number;
  type: 'system' | 'user' | 'assistant';
  content: string;
  products?: Product[];
}

// 定义商品类型
interface Product {
  id: number;
  name: string;
  price: string;
  image: any;
  description: string;
}

const screenWidth = Dimensions.get('window').width;

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
      content: '好的，我为您找到了几款符合条件的韩系春装连衣裙：',
      products: [
        {
          id: 1,
          name: '甜美淑女风浅绿色针织连衣裙',
          price: '¥189',
          image: require('../../assets/images/products/1.png'),
          description: '韩系设计，收腰显瘦，针织面料舒适透气'
        },
        {
          id: 2,
          name: '春季新款淑女风格连衣裙',
          price: '¥168',
          image: require('../../assets/images/products/2.png'),
          description: '浅绿色调，A字裙型，优雅大方'
        },
        {
          id: 3,
          name: '韩版气质淑女连衣裙',
          price: '¥199',
          image: require('../../assets/images/products/3.png'),
          description: '浅绿色，蕾丝拼接设计，清新淑女风'
        }
      ]
    },
    {
      id: 4,
      type: 'assistant',
      content: '您对哪一款更感兴趣？需要我提供更多详情或者其他款式吗？'
    }
  ]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const inputHeight = useRef(new Animated.Value(50)).current;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
    >
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

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
            <View style={styles.assistantMessageContent}>
              <View style={styles.assistantMessage}>
                <Text style={styles.assistantMessageText}>{msg.content}</Text>
              </View>
              
              {msg.products && msg.products.length > 0 && (
                <View style={styles.productList}>
                  {msg.products.map((product) => (
                    <TouchableOpacity 
                      key={product.id}
                      style={styles.productCard}
                      onPress={() => handleProductPress(product)}
                    >
                      <View style={styles.productCardContent}>
                        <Image source={product.image} style={styles.productImage} />
                        <View style={styles.productInfo}>
                          <Text style={styles.productName}>{product.name}</Text>
                          <Text style={styles.productPrice}>{product.price}</Text>
                          <Text style={styles.productDescription}>{product.description}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
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

      {/* 商品详情模态框 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <FontAwesome name="close" size={24} color="#333" />
            </TouchableOpacity>
            
            {selectedProduct && (
              <ScrollView style={styles.modalScrollView}>
                <Image source={selectedProduct.image} style={styles.modalProductImage} />
                <View style={styles.modalProductInfo}>
                  <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
                  <Text style={styles.modalProductPrice}>{selectedProduct.price}</Text>
                  <Text style={styles.modalProductDescription}>{selectedProduct.description}</Text>
                  
                  <View style={styles.productDetails}>
                    <Text style={styles.detailsTitle}>商品详情</Text>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>材质：</Text>
                      <Text style={styles.detailValue}>优质针织面料</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>尺码：</Text>
                      <Text style={styles.detailValue}>S, M, L, XL</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>风格：</Text>
                      <Text style={styles.detailValue}>韩系淑女</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>适用季节：</Text>
                      <Text style={styles.detailValue}>春季</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>洗涤说明：</Text>
                      <Text style={styles.detailValue}>手洗或机洗，不可漂白</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>立即购买</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.addToCartButton}>
                    <FontAwesome name="shopping-cart" size={18} color="#4a90e2" style={styles.cartIcon} />
                    <Text style={styles.addToCartText}>加入购物车</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
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
    paddingBottom: 20,
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
  assistantMessageContent: {
    flex: 1,
    maxWidth: '80%',
  },
  assistantMessage: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  assistantMessageText: {
    fontSize: 16,
    color: '#333',
  },
  productList: {
    marginTop: 12,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  productCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  productInfo: {
    flex: 1,
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    ...Platform.select({
      ios: {
        paddingBottom: 20, // 为 iOS 添加额外的底部内边距
      }
    }),
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
    ...Platform.select({
      ios: {
        paddingTop: 10, // 为 iOS 添加顶部内边距
        paddingBottom: 10, // 为 iOS 添加底部内边距
      }
    }),
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
  // 模态框样式
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScrollView: {
    flex: 1,
  },
  modalProductImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  modalProductInfo: {
    padding: 16,
  },
  modalProductName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalProductPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 12,
  },
  modalProductDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  productDetails: {
    marginBottom: 24,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    width: 80,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  buyButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  cartIcon: {
    marginRight: 8,
  },
  addToCartText: {
    color: '#4a90e2',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 