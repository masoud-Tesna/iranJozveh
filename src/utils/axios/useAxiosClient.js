import axios from 'axios';
import baseURL from './baseURL';
import {useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';

export const useAxiosClient = ({type = 'JSON', customRequestHeader = {}}) => {
  const route = useRouter();
  const queryClient = useQueryClient();
  
  const accessToken = null; // set accessToken
  
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
      
      // if expire accessToken
      if (error?.response?.status === 401) {
        await handleLogout(queryClient);
      }
      else {
        return Promise.reject(error?.response?.data);
      }
    }
  );
  
  return client;
};
