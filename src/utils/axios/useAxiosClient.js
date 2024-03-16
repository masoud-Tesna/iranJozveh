import axios from 'axios';
import baseURL from './baseURL';
import {useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/app/context/auth/auth-context';
import handleRefreshToken from '@/utils/axios/handleRefreshToken';

export const useAxiosClient = ({type = 'JSON', customRequestHeader = {}}) => {
  const {handleLogout, tokenInfo, handleChangeAccessToken} = useAuth();
  const queryClient = useQueryClient();
  
  const accessToken = tokenInfo?.accessToken; // set accessToken
  
  // set default header
  const headers = {
    'Content-Type': type === 'formData' ? 'multipart/form-data' : 'application/json', // content-type default as
                                                                                      // application/json OR
                                                                                      // multipart/form-data
    Accept: 'application/json',
    // 'Access-Control-Allow-Origin': '*',
    Authorization: accessToken, // set Authorization accessToken,
    ...customRequestHeader
  };
  
  // create axios instance
  const client = axios.create({
    baseURL: baseURL?._serviceURL, // default base url
    headers // set headers
  });
  
  client.interceptors.response.use(
    async (response) => Promise.resolve(response),
    async (error) => {
      const originalRequest = error.config; // save original request
      
      if (error?.response?.status === 401) {
        const newAccessToken = await handleRefreshToken(tokenInfo?.refreshToken);
        
        if (newAccessToken) {
          await handleChangeAccessToken(newAccessToken);
          
          originalRequest.headers.Authorization = newAccessToken;
          
          return axios(originalRequest);
        }
        else {
          return await handleLogout();
        }
      }
      
      return Promise.reject(error?.response?.data);
    }
  );
  
  return client;
};
