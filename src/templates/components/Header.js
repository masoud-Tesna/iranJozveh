'use client';

import {useState} from 'react';
import {Col, Drawer, Layout, Row} from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import logo from '/public/logo.svg';
import {MenuOutlined} from '@ant-design/icons';
import MobileMenu from './MobileMenu';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';

const LoginSection = dynamic(
  () => import('./LoginSection'),
  {
    ssr: false,
    loading: () => <Skeleton height={23} width={100} baseColor={'rgba(255,255,255,.1)'} />
  }
);

const Header = () => {
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  
  const handleOpenDrawer = () => setMenuDrawerOpen(true);
  
  const handleCloseDrawer = () => setMenuDrawerOpen(false);
  
  return (
    <>
      <Layout.Header className="!shadow-1 !bg-primary !h-[50px] md:!h-[75px] !px-[6%] !leading-[50px] md:!leading-[75px]">
        <Row align={'middle'} className="h-full !hidden md:!flex">
          <Col flex={'1 1'} className="text-center">
            <Link href={'/'} className="my-auto" scroll={false}>
              <Image
                src={logo}
                alt="Hirad Construction Company"
                priority
                className="cursor-pointer max-h-[65px]"
              />
            </Link>
          </Col>
          
          <Col>
            <LoginSection />
          </Col>
        </Row>
        
        <Row align={'middle'} className="h-full md:!hidden" justify={'space-between'}>
          <Col span={3} className="cursor-pointer" onClick={handleOpenDrawer}>
            <MenuOutlined className="!text-white text-[21px] !align-middle" />
          </Col>
          
          <Col flex={'1 1'} className="text-center">
            <Link href={'/'} className="my-auto inl" scroll={false}>
              <Image
                src={logo}
                alt="Hirad Construction Company"
                priority
                className="cursor-pointer max-h-[40px] md:max-h-[65px]"
              />
            </Link>
          </Col>
        </Row>
      </Layout.Header>
      
      <Drawer
        title="گروه ساختمانی هیراد"
        onClose={handleCloseDrawer}
        open={menuDrawerOpen}
        width={'70%'}
      >
        <MobileMenu handleCloseDrawer={handleCloseDrawer} />
      </Drawer>
    </>
  );
};

export default Header;
