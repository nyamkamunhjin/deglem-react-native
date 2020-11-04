import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useFetch = (url) => {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      setStatus('fetching');
      const response = await fetch(url);
      const data = await response.json();

      AsyncStorage.setItem('url', data);
      setData(data);
      setStatus('fetched');
    };

    fetchData();
  }, [url]);

  return { status, data };
};

export { useFetch };
