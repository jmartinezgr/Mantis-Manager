import { useState } from 'react';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApi = async (url, method = 'GET', body = null, headers = {}) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`; // Añadir token si existe
      }
      headers['Content-Type'] = 'application/json';

      const options = {
        method,
        headers,
        ...(body && { body: JSON.stringify(body) }),
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { fetchApi, loading, error };
};
