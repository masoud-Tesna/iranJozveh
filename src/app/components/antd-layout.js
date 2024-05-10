'use client';

import {Layout} from 'antd';
import {UploadProgressProvider} from '@/app/context/upload-progress';

const AntdLayout = ({children}) => {
  return (
    <Layout className="h-full">
      <Layout.Content>
        <UploadProgressProvider>
        {children}
        </UploadProgressProvider>
      </Layout.Content>
    </Layout>
  );
};

export default AntdLayout;
