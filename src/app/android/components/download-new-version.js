'use client';

import {Button} from 'antd';
import {useRequest} from '@/utils/useRequest';

const DownloadNewVersion = () => {
  const request = useRequest();
  
  const {data, isLoading} = request.useQuery({
    url: '/v1/android/version/latest',
    gcTime: 1000,
    queryKey: ['android-latest-version']
  });
  
  const versionDetails = data?.response?.version;
  
  return (
    <Button type="primary" block className="!h-[60px]">
      دانلود
    </Button>
  );
};

export default DownloadNewVersion;
