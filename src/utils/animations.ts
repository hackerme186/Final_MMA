import { Animated } from 'react-native';

export class AnimationHelper {
  static createFadeIn(duration: number = 300) {
    const opacity = new Animated.Value(0);
    
    const animate = () => {
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    };

    return { opacity, animate };
  }

  static createSlideUp(duration: number = 300) {
    const translateY = new Animated.Value(100);
    
    const animate = () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start();
    };

    return { translateY, animate };
  }

  static createScale(duration: number = 200) {
    const scale = new Animated.Value(1);
    
    const animateIn = () => {
      Animated.timing(scale, {
        toValue: 1.1,
        duration,
        useNativeDriver: true,
      }).start();
    };

    const animateOut = () => {
      Animated.timing(scale, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();
    };

    return { scale, animateIn, animateOut };
  }
}
