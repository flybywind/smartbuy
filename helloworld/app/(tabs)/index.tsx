import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleStartChat = () => {
    router.push('/(tabs)/chat' as any);
  };

  const categories = [
    { icon: 'tshirt', name: '服装' },
    { icon: 'mobile-alt', name: '电子' },
    { icon: 'home', name: '家居' },
    { icon: 'utensils', name: '美食' },
    { icon: 'heartbeat', name: '健康' },
    { icon: 'gift', name: '礼品' },
  ];

  const recentSearches = [
    '韩系春装搭配',
    '男士运动鞋推荐',
    '家用电器选购',
    '智能手机对比'
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Image 
          source={require('../../assets/images/logo.svg')} 
          style={styles.logo}
        />
        <Text style={styles.title}>SmartBuy</Text>
        <Text style={styles.slogan}>智能购物，轻松选择</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <FontAwesome name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="搜索商品、品牌或类别..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <FontAwesome name="times-circle" size={20} color="#888" />
            </TouchableOpacity>
          )}
        </View>
        
        <TouchableOpacity style={styles.voiceSearchBtn}>
          <FontAwesome name="microphone" size={20} color="#4a90e2" />
        </TouchableOpacity>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>商品分类</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <FontAwesome5 name={category.icon} size={24} color="#4a90e2" />
              </View>
              <Text style={styles.categoryName}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>最近搜索</Text>
        <View style={styles.recentList}>
          {recentSearches.map((search, index) => (
            <TouchableOpacity key={index} style={styles.recentItem}>
              <FontAwesome name="history" size={16} color="#888" style={styles.recentIcon} />
              <Text style={styles.recentText}>{search}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.chatSection}>
        <Text style={styles.chatTitle}>开始智能购物体验</Text>
        <Text style={styles.chatDescription}>
          告诉我们您的需求，SmartBuy 智能助手将为您推荐最合适的商品。
        </Text>
        <TouchableOpacity style={styles.startChatBtn} onPress={handleStartChat}>
          <FontAwesome name="comment" size={20} color="#fff" style={styles.chatBtnIcon} />
          <Text style={styles.startChatBtnText}>开始聊天</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 8,
  },
  slogan: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 50,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  voiceSearchBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f7ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#333',
  },
  recentSection: {
    marginBottom: 24,
  },
  recentList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recentIcon: {
    marginRight: 12,
  },
  recentText: {
    fontSize: 14,
    color: '#333',
  },
  chatSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  chatDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  startChatBtn: {
    backgroundColor: '#4a90e2',
    borderRadius: 8,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  chatBtnIcon: {
    marginRight: 8,
  },
  startChatBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
