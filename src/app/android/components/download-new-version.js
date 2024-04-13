'use client';

import {Button} from 'antd';
import {useRequest} from '@/utils/useRequest';
import baseURL from '@/utils/axios/baseURL';

const DownloadNewVersion = () => {
  const request = useRequest();
  
  const {data, isLoading} = request.useQuery({
    url: '/v1/android/version/latest',
    gcTime: 1000,
    queryKey: ['android-latest-version']
  });
  
  const versionDetails = data?.response?.version;
  
  return (
    <Button
      type="primary"
      href={`${baseURL?._serviceURL}/public/apk/esapp_v${versionDetails?.versionName}.apk`}
      block
      className="!h-[60px] !pt-[16px]"
    >
      دانلود
    </Button>
  );
};

export default DownloadNewVersion;
