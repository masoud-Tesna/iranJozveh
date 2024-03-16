'use client';

import {Layout} from 'antd';
import logo from '/public/logo.svg';
import Image from 'next/image';
import SidebarMenu from './sidebar-menu';

const Sidebar = () => {
  return (
    <Layout.Sider
      className="p-[20px] overflow-auto h-screen !sticky !start-0 !top-0 !bottom-0 !bg-primary"
      theme={'light'}
      width={270}
    >
      <div className="text-center mb-[16px]">
        <Image
          src={logo}
          alt="Hirad"
          priority
          className="max-h-[63px]"
        />
      </div>
      
      <div className="text-white text-captionMd ms-[30px] mb-24">
        منو
      </div>
      
      <SidebarMenu />
    </Layout.Sider>
  );
};

export default Sidebar;
