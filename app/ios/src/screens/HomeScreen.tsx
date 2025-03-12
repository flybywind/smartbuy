import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { colors, globalStyles } from '../utils/styles';
import Icon from 'react-native-vector-icons/FontAwesome';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface NavLinkProps {
  icon: string;
  title: string;
  description: string;
  onPress: () => void;
}

const NavLink = ({ icon, title, description, onPress }: NavLinkProps) => {
  return (
    <TouchableOpacity style={styles.navLink} onPress={onPress}>
      <Icon name={icon} size={20} color={colors.primary} style={styles.navIcon} />
      <View style={styles.navLinkContent}>
        <Text style={styles.navLinkTitle}>{title}</Text>
        <Text style={styles.navLinkDescription}>{description}</Text>
      </View>
      <Icon name="chevron-right" size={14} color={colors.lightText} />
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const goToLogin = () => navigation.navigate('Login');
  const goToChat = () => navigation.navigate('Chat');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.svg')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>SmartBuy</Text>
          <Text style={styles.slogan}>智能购物，轻松选择</Text>
        </View>

        <View style={styles.navLinks}>
          <NavLink
            icon="sign-in"
            title="登录/注册"
            description="登录您的账户或创建新账户"
            onPress={goToLogin}
          />
          <NavLink
            icon="comments"
            title="智能购物助手"
            description="描述您想要的商品，获取智能推荐"
            onPress={goToChat}
          />
          <NavLink
            icon="history"
            title="浏览历史"
            description="查看您最近浏览过的商品"
            onPress={() => {}}
          />
          <NavLink
            icon="user"
            title="个人中心"
            description="管理您的账户和设置"
            onPress={() => {}}
          />
        </View>

        <Text style={styles.footer}>© 2024 SmartBuy. 保留所有权利。</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  slogan: {
    fontSize: 15,
    color: colors.lightText,
    marginBottom: 24,
  },
  navLinks: {
    width: '100%',
    marginBottom: 32,
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  navIcon: {
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  navLinkContent: {
    flex: 1,
  },
  navLinkTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: colors.text,
  },
  navLinkDescription: {
    fontSize: 13,
    color: colors.lightText,
  },
  footer: {
    fontSize: 13,
    color: colors.lightText,
    marginTop: 24,
  },
});

export default HomeScreen;
