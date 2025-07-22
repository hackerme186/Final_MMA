import { useEffect, useState } from 'react';
import { mockHomeData } from '../mockHomeData';
import { HomeData } from '../types/HomeTypes';

export const useHomeData = () => {
  const [data, setData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setTimeout(() => {
      setData(mockHomeData);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setRefreshing(true);
    setTimeout(() => {
      setData(mockHomeData);
      setRefreshing(false);
    }, 800);
  };

  return { data, loading, refreshing, refetch };
}; 