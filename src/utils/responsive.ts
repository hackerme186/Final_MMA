import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Base dimensions (iPhone 11 Pro)
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export class ResponsiveHelper {
  static scaleWidth(size: number): number {
    return (SCREEN_WIDTH / BASE_WIDTH) * size;
  }

  static scaleHeight(size: number): number {
    return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
  }

  static scaleFontSize(size: number): number {
    const scale = SCREEN_WIDTH / BASE_WIDTH;
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }

  static getPadding(size: number = 16): number {
    return this.scaleWidth(size);
  }

  static getMargin(size: number = 16): number {
    return this.scaleWidth(size);
  }

  static getBorderRadius(size: number = 8): number {
    return this.scaleWidth(size);
  }

  static getComponentSizes() {
    return {
      button: {
        small: this.scaleWidth(32),
        medium: this.scaleWidth(40),
        large: this.scaleWidth(48),
      },
      icon: {
        small: this.scaleWidth(16),
        medium: this.scaleWidth(20),
        large: this.scaleWidth(24),
      },
      spacing: {
        xs: this.scaleWidth(4),
        sm: this.scaleWidth(8),
        md: this.scaleWidth(16),
        lg: this.scaleWidth(24),
        xl: this.scaleWidth(32),
      }
    };
  }

  static isSmallScreen(): boolean {
    return SCREEN_WIDTH < 375;
  }

  static isLargeScreen(): boolean {
    return SCREEN_WIDTH > 414;
  }
}
