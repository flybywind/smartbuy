# SmartBuy iOS 应用

这是 SmartBuy 智能购物助手应用的 iOS 版本，使用 React Native 开发。

## 功能概述

- 用户登录/注册
- 智能购物助手聊天界面
- 产品推荐展示
- 个人中心

## 技术栈

- React Native
- Expo
- React Navigation
- TypeScript

## 项目结构

```
app/ios/
├── src/                       # 源代码
│   ├── components/            # 可复用组件
│   ├── screens/               # 应用屏幕组件
│   ├── navigation/            # 导航相关
│   ├── utils/                 # 工具函数和样式
│   └── assets/                # 资源文件
├── App.tsx                    # 应用入口
└── package.json               # 项目依赖
```

## 安装与运行

### 前置要求

- Node.js 18 或更高版本
- Yarn 或 npm
- iOS 设备或模拟器
- Xcode (对于 iOS 模拟器)

### 安装步骤

1. 安装依赖

```bash
cd app/ios
npm install
# 或
yarn install
```

2. 启动开发服务器

```bash
npm start
# 或
yarn start
```

3. 在 iOS 设备或模拟器上运行

```bash
npm run ios
# 或
yarn ios
```

## 屏幕概述

### 登录屏幕

用户登录界面，支持账号密码登录和微信登录。

### 主页屏幕

应用主页，提供各功能入口，包括购物助手、浏览历史和个人中心。

### 聊天屏幕

智能购物助手聊天界面，用户可以通过自然语言描述需求，获取智能产品推荐。

## 开发备注

- 该应用是基于 SmartBuy 网页版原型转换的 React Native 版本
- 样式设计支持小屏幕手机适配
- 推荐使用 iPhone 8 或更新设备进行测试 