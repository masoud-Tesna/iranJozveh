'use client';

import {Col, Layout, Row, Skeleton} from 'antd';
import Header from '@/app/dashboard/components/Header';
import Sidebar from '@/app/dashboard/components/Sidebar';
import {useState} from 'react';
import DashboardPageIsLoading from './components/DashboardPageIsLoading';

const PageTemplate = ({children}) => {
  const [isLoading, setIsLoading] = useState(false);
  
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
                <DashboardPageIsLoading />
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
