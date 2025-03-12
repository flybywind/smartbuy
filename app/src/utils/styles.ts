import { StyleSheet } from 'react-native';

// 定义应用的颜色主题
export const colors = {
  primary: '#4a90e2',
  secondary: '#6ac1e5',
  text: '#333',
  lightText: '#888',
  border: '#e0e0e0',
  background: '#f8f9fa',
  userMessage: '#e3f2fd',
  botMessage: '#f5f5f5',
  white: '#ffffff',
  error: '#e74c3c',
  success: '#2ecc71',
  wechat: '#07c160',
  transparent: 'transparent',
  cardShadow: 'rgba(0, 0, 0, 0.1)',
};

// 通用的样式
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: colors.lightText,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    width: '100%',
    marginBottom: 16,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}); 