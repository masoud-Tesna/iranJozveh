'use client';

import {Spin as AntdSpin} from 'antd';
import {useIsMutating} from '@tanstack/react-query';

const Spin = ({children}) => {
  const isLoading = useIsMutating({mutationKey: ['auth', 'signIn']});
  
  return (
    <AntdSpin spinning={!!isLoading}>
      {children}
    </AntdSpin>
  );
};

export default Spin;
