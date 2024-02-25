import { useQuery } from '@/utils/useRequest/useQuery';
import { useMutation } from '@/utils/useRequest/useMutation';

export const useRequest = () => {
  return {
    useQuery,
    useMutation
  };
};
