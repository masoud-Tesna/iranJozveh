'use client';

import {Col, Layout, Row, Skeleton} from 'antd';
import Header from '@/app/dashboard/components/header';
import Sidebar from '@/app/dashboard/components/sidebar';
import {useEffect, useState} from 'react';
import DashboardPageLoading from './components/dashboard-page-loading';
import {useAuth} from '@/app/context/auth/auth-context';
import {redirect, useRouter} from 'next/navigation';

const PageTemplate = ({children}) => {
  const router = useRouter();
  
  const {isLoggedIn} = useAuth();
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!isLoggedIn) {
      redirect('/auth/login');
      setIsLoading(false);
    }
    else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);
  
  return (
    <Layout className="min-h-full" hasSider>
      {isLoading ?
        <Layout className="!bg-[#FAFBFD] h-screen">
          <Layout.Content>
            <Row align={'stretch'} className="h-full !m-0">
              <Col flex={'270px'}>
                <Skeleton.Button block className="!h-full" />
              </Col>
              
              <Col flex={'1 1'}>
                <DashboardPageLoading />
              </Col>
            </Row>
          </Layout.Content>
        </Layout> :
        <>
          <Sidebar />
          
          <Layout className="!bg-[#FAFBFD]">
            <Layout.Header className="!bg-white !h-[80px] !flex justify-end shadow-8 relative">
              <Header />
            </Layout.Header>
            
            <Layout.Content>
              {children}
            </Layout.Content>
          </Layout>
        </>
      }
    </Layout>
  );
};

export default PageTemplate;
