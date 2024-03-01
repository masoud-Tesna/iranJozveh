import axios from 'axios';
import baseURL from './baseURL';

const handleRefreshToken = async (refreshToken) => {
  try {
    const result = await axios.post(`${baseURL?._serviceURL}/api/v1/auth/token`, {
      refreshToken
    });
    
    return Promise.resolve(result?.data?.response?.accessToken);
    
  } catch (error) {
    return Promise.reject(new Error(error?.response?.data?.message || 'error in refresh token'));
  }
};
export default handleRefreshToken;
