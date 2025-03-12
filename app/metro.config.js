const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// 添加额外的忽略模式
defaultConfig.watchFolders = [__dirname];
defaultConfig.resolver.blockList = [/node_modules\/.*/];

module.exports = defaultConfig; 