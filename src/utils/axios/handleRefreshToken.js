import axios from 'axios';
import baseURL from './baseURL';

const handleRefreshToken = async (refreshToken) => {
  try {
    const result = await axios.post(`${baseURL?._serviceURL}/v1/auth/token`, {
      refreshToken
    });
    
    return Promise.resolve(result?.data?.response?.accessToken);
    
  } catch (error) {
    return Promise.resolve(null);
  }
};
export default handleRefreshToken;
