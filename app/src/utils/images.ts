// 由于React Native在处理SVG文件时的限制，我们可以创建一个辅助函数来处理图像资源的导入
import { ImageSourcePropType } from "react-native";
export const images = { logo: require("../assets/logo.svg") as ImageSourcePropType };
export const getImage = (name: keyof typeof images): ImageSourcePropType => { return images[name]; };
export const svgToPng = (svgSource: any): ImageSourcePropType => { return svgSource as ImageSourcePropType; };
