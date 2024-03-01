'use client';

import {Layout} from 'antd';

const AntdLayout = ({children}) => {
  return (
    <Layout className="h-full">
      <Layout.Content>
        {children}
      </Layout.Content>
    </Layout>
  );
};

export default AntdLayout;
