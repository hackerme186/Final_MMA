import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
// import { useState } from 'react';

export function useNavigationLoading() {
  const navigation = useNavigation();
  // const [isLoading, setIsLoading] = useState(false);
  const isLoading = false;

  const navigateWithLoading = useCallback((screenName: string, params?: any) => {
    // setIsLoading(true);

    // Show loading for a brief moment to provide feedback
    setTimeout(() => {
      navigation.navigate(screenName as never, params as never);
      // setIsLoading(false);
    }, 300); // 300ms loading duration
  }, [navigation]);

  const goBackWithLoading = useCallback(() => {
    // setIsLoading(true);

    setTimeout(() => {
      navigation.goBack();
      // setIsLoading(false);
    }, 200); // Shorter duration for back navigation
  }, [navigation]);

  return {
    isLoading,
    navigateWithLoading,
    goBackWithLoading,
  };
}
