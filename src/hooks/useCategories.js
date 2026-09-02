import { useState, useEffect } from 'react';
import { api } from '../utils/api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.getCategories();
        setCategories(['all', ...(data || [])]);
      } catch (err) {
        setError(err.message);
        setCategories(['all']);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};