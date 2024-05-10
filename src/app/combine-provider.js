'use client';

import {ConfigProvider} from 'antd';
import faIR from 'antd/locale/fa_IR';
import {antdTheme} from '@/theme';
import {useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AntdRegistry} from '@ant-design/nextjs-registry';
import {AuthProvider} from '@/app/context/auth/auth-context';

const CombineProvider = ({children}) => {

  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AntdRegistry>
          <ConfigProvider theme={antdTheme} direction={'rtl'} locale={faIR}>
            <ToastContainer
              position="top-right"
              autoClose={4000}
              rtl
              draggable
              theme="colored"
              closeButton
              bodyClassName="text-[0.875rem] font-vazir"
              stacked
            />

            {children}

            <ReactQueryDevtools />
          </ConfigProvider>
        </AntdRegistry>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default CombineProvider;
