import {useAxiosClient} from '@/utils/axios/useAxiosClient';
import {useQuery as tanstackUseQuery} from '@tanstack/react-query';

export const useQuery = (
    {
        url,
        params,
        body,
        method = 'get',
        justResponse = true,
        customRequestHeader,
        ...rest
    }
) => {

    const axiosClient = useAxiosClient({customRequestHeader});

    // async function for get API:
    const callApi = async () => {
        const result = await axiosClient.request(
            {
                method: method,
                url,
                params,
                data: {...body}
            }
        );

        return result?.data;
    };

    return tanstackUseQuery({
        queryFn: callApi,
        refetchOnWindowFocus: false,
        retry: 0,
        ...rest
    });

};
