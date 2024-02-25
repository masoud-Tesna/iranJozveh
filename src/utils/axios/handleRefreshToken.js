import axios from 'axios';
import baseURL from './baseURL';

const handleRefreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  try {
    const result = await axios.post(`${baseURL?._serviceURL}/auth/refresh-token`, {
      refreshToken
    });
    
    localStorage.setItem('accessToken', result?.data?.response?.newAccessToken);
    
    return Promise.resolve(result?.data?.response?.newAccessToken);
    
  } catch (error) {
    return Promise.reject(new Error(error?.response?.data?.message || 'error in refresh token'));
  }
};
export default handleRefreshToken;
