import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

// 模拟消息数据
interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: string;
}

// 模拟产品数据
interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  shop: string;
  sales: string;
  image: any;
}

// 模拟聊天历史
interface ChatHistory {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
  isActive?: boolean;
}

const ChatScreen = () => {
  const navigation = useNavigation();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [input, setInput] = useState('');
  
  const windowWidth = Dimensions.get('window').width;
  
  // 模拟数据
  const chatHistories: ChatHistory[] = [
    {
      id: '1',
      title: '韩系春装搭配',
      preview: '韩系 春装 漂亮针织连衣裙 淑女 浅绿色 200元以内',
      timestamp: '今天',
      isActive: true,
    },
    {
      id: '2',
      title: '男士运动鞋推荐',
      preview: '有什么舒适的男士运动鞋推荐？预算300-500元',
      timestamp: '昨天',
    },
    {
      id: '3',
      title: '家用电器选购',
      preview: '想买一台性价比高的吸尘器，有什么推荐？',
      timestamp: '3天前',
    },
    {
      id: '4',
      title: '手机配件',
      preview: 'iPhone 13 Pro Max 有什么好用的保护壳推荐？',
      timestamp: '上周',
    },
    {
      id: '5',
      title: '厨房用品',
      preview: '有什么实用的厨房小工具推荐？',
      timestamp: '2周前',
    },
  ];
  
  const messages: Message[] = [
    {
      id: '1',
      text: '韩系 春装 漂亮针织连衣裙 淑女 浅绿色 200元以内',
      isUser: true,
      timestamp: '14:25',
    },
    {
      id: '2',
      text: '我找到了几款符合您要求的韩系春装针织连衣裙，都是浅绿色系，价格在200元以内：',
      isUser: false,
      timestamp: '14:26',
    },
  ];
  
  const products: Product[] = [
    {
      id: '1',
      title: '韩版淑女针织连衣裙',
      description: '2024春季新款 淡雅浅绿色 修身显瘦',
      price: '¥189',
      shop: '优雅衣橱旗舰店',
      sales: '月销2800+',
      image: require('../assets/logo.svg'), // 替代图片
    },
    {
      id: '2',
      title: '春季薄款针织连衣裙',
      description: '韩国设计 淑女风 薄荷绿 舒适面料',
      price: '¥159',
      shop: '首尔风尚店',
      sales: '月销1500+',
      image: require('../assets/logo.svg'), // 替代图片
    },
    {
      id: '3',
      title: '轻奢针织连衣裙',
      description: '2024春夏新款 韩系淑女 浅绿色调 优雅气质',
      price: '¥199',
      shop: '轻奢时尚馆',
      sales: '月销980+',
      image: require('../assets/logo.svg'), // 替代图片
    },
  ];
  
  // 渲染聊天历史项
  const renderChatHistoryItem = ({ item }: { item: ChatHistory }) => (
    <TouchableOpacity 
      style={[styles.chatHistoryItem, item.isActive && styles.activeChatItem]}
    >
      <View style={styles.chatItemContent}>
        <Text style={styles.chatItemTitle}>{item.title}</Text>
        <Text style={styles.chatItemPreview} numberOfLines={1}>
          {item.preview}
        </Text>
      </View>
      <Text style={styles.chatItemTime}>{item.timestamp}</Text>
    </TouchableOpacity>
  );
  
  // 渲染产品卡片
  const renderProductCard = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image source={item.image} style={styles.productImage} />
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <View style={styles.productMeta}>
          <Text style={styles.shopName}>{item.shop}</Text>
          <Text style={styles.salesCount}>{item.sales}</Text>
        </View>
        <TouchableOpacity style={styles.viewDetailBtn}>
          <Text style={styles.viewDetailBtnText}>查看详情</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  
  // 渲染消息项
  const renderMessageItem = ({ item, index }: { item: Message, index: number }) => {
    // 判断是否需要在消息后渲染产品列表
    const shouldRenderProducts = !item.isUser && index === 1;
    
    // 渲染额外的智能助手回复
    const shouldRenderExtraReply = !item.isUser && index === 1;
    
    return (
      <>
        <View style={[
          styles.messageContainer,
          item.isUser ? styles.userMessageContainer : styles.botMessageContainer
        ]}>
          <View style={[
            styles.messageBubble,
            item.isUser ? styles.userMessageBubble : styles.botMessageBubble
          ]}>
            <Text style={[
              styles.messageText,
              item.isUser ? styles.userMessageText : styles.botMessageText
            ]}>
              {item.text}
            </Text>
          </View>
          <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
        </View>
        
        {shouldRenderProducts && (
          <View style={styles.productsContainer}>
            <FlatList
              data={products}
              renderItem={renderProductCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}
        
        {shouldRenderExtraReply && (
          <View style={[
            styles.messageContainer,
            styles.botMessageContainer
          ]}>
            <View style={[
              styles.messageBubble,
              styles.botMessageBubble
            ]}>
              <Text style={[
                styles.messageText,
                styles.botMessageText
              ]}>
                这些连衣裙都符合您的要求，价格在200元以内，是韩系淑女风格的浅绿色针织连衣裙。您对哪一款更感兴趣？或者您还有其他的要求吗？
              </Text>
            </View>
            <Text style={styles.messageTimestamp}>14:26</Text>
          </View>
        )}
      </>
    );
  };
  
  const sendMessage = () => {
    if (input.trim()) {
      // 发送消息逻辑
      setInput('');
    }
  };
  
  return (
    <SafeAreaView style={styles.container}>
      {/* 侧边栏 */}
      {sidebarVisible && (
        <View style={[
          styles.sidebar,
          { width: Math.min(280, windowWidth * 0.8) }
        ]}>
          <View style={styles.sidebarHeader}>
            <View style={styles.logo}>
              <Image
                source={require('../assets/logo.svg')}
                style={styles.logoImage}
              />
              <Text style={styles.logoText}>SmartBuy</Text>
            </View>
            <TouchableOpacity
              onPress={() => setSidebarVisible(false)}
              style={styles.closeSidebarBtn}
            >
              <Icon name="times" size={16} color={colors.lightText} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.searchBox}>
            <Icon name="search" size={14} color={colors.lightText} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="搜索聊天记录..."
              placeholderTextColor={colors.lightText}
            />
          </View>
          
          <FlatList
            data={chatHistories}
            renderItem={renderChatHistoryItem}
            keyExtractor={(item) => item.id}
            style={styles.chatHistoryList}
          />
          
          <View style={styles.newChatBtnContainer}>
            <TouchableOpacity style={styles.newChatBtn}>
              <Icon name="plus" size={14} color={colors.white} style={styles.plusIcon} />
              <Text style={styles.newChatBtnText}>新的购物咨询</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {/* 主聊天区域 */}
      <View style={styles.mainChat}>
        <View style={styles.chatHeader}>
          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => setSidebarVisible(!sidebarVisible)}
          >
            <Icon name="bars" size={16} color={colors.lightText} />
          </TouchableOpacity>
          <Text style={styles.chatHeaderTitle}>韩系春装搭配</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionBtn}>
              <Icon name="share-alt" size={14} color={colors.lightText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn}>
              <Icon name="ellipsis-v" size={14} color={colors.lightText} />
            </TouchableOpacity>
          </View>
        </View>
        
        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        />
        
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
          style={styles.inputContainer}
        >
          <View style={styles.inputWrapper}>
            <TouchableOpacity style={styles.inputActionBtn}>
              <Icon name="image" size={14} color={colors.lightText} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="描述您想要的商品..."
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity style={styles.inputActionBtn}>
              <Icon name="microphone" size={14} color={colors.lightText} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
            <Icon name="paper-plane" size={14} color={colors.white} />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'row',
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: colors.white,
    borderRightWidth: 1,
    borderRightColor: colors.border,
    flexDirection: 'column',
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  logoText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  closeSidebarBtn: {
    padding: 5,
  },
  searchBox: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 36,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingLeft: 30,
    paddingRight: 10,
    fontSize: 13,
  },
  chatHistoryList: {
    flex: 1,
    padding: 8,
  },
  chatHistoryItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activeChatItem: {
    backgroundColor: `${colors.primary}10`,
  },
  chatItemContent: {
    flex: 1,
    marginRight: 8,
  },
  chatItemTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: colors.text,
  },
  chatItemPreview: {
    fontSize: 12,
    color: colors.lightText,
  },
  chatItemTime: {
    fontSize: 11,
    color: colors.lightText,
    alignSelf: 'flex-start',
  },
  newChatBtnContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  newChatBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusIcon: {
    marginRight: 6,
  },
  newChatBtnText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '500',
  },
  mainChat: {
    flex: 1,
    flexDirection: 'column',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.white,
  },
  menuBtn: {
    padding: 5,
    marginRight: 10,
  },
  chatHeaderTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionBtn: {
    padding: 5,
    marginLeft: 12,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messagesContent: {
    padding: 15,
  },
  messageContainer: {
    marginBottom: 16,
    maxWidth: '85%',
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  botMessageContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  userMessageBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  botMessageBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
  },
  userMessageText: {
    color: colors.white,
  },
  botMessageText: {
    color: colors.text,
  },
  messageTimestamp: {
    fontSize: 11,
    color: colors.lightText,
    marginTop: 4,
  },
  productsContainer: {
    marginVertical: 12,
    maxWidth: '95%',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  productImageContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productPrice: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: colors.white,
    padding: 3,
    paddingHorizontal: 6,
    fontSize: 12,
    fontWeight: 'bold',
  },
  productInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 12,
    color: colors.lightText,
    marginBottom: 6,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  shopName: {
    fontSize: 11,
    color: colors.lightText,
  },
  salesCount: {
    fontSize: 11,
    color: colors.lightText,
  },
  viewDetailBtn: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-end',
  },
  viewDetailBtnText: {
    color: colors.white,
    fontSize: 12,
  },
  inputContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 4,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 36,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  inputActionBtn: {
    padding: 6,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;
