'use client';

import Link from 'next/link';
import {Dropdown, Space} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {useAuth} from '@/app/context/auth/auth-context';

const Header = () => {
  const {handleLogout} = useAuth();
  
  const items = [
    {
      label: (
        <Link href={'/'}>
          صفحه اصلی
        </Link>
      ),
      key: '0'
    },
    {
      type: 'divider'
    },
    {
      label: <div>خروج</div>,
      key: '1',
      danger: true,
      onClick: handleLogout
    }
  ];
  
  return (
    <Dropdown
      menu={{items}}
      trigger={['click']}
    >
      <Space size={20} className="cursor-pointer">
        <div>
          <div className="text-blue-shade-7 text-captionMd">
            مدیر سامانه
          </div>
          
          <div className="text-gray-40 text-captionSm">
            Admin
          </div>
        </div>
        <DownOutlined className="!text-secondary" />
      </Space>
    </Dropdown>
  );
};

export default Header;
