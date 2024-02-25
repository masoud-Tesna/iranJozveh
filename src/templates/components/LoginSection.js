import {Dropdown, Space} from 'antd';
import {useAuth} from '@/app/contexts/auth/AuthContext';
import Link from 'next/link';
import {DownOutlined} from '@ant-design/icons';
import {useLoginModal} from '@/app/contexts/auth/LoginModalContext';

const LoginSection = () => {
  const {isLoggedIn, userInfo, handleLogout} = useAuth();
  
  const {handleOpenLoginModal} = useLoginModal();
  
  const adminItem = userInfo?.type === 'admin' ? {key: '1', label: <Link href={'/dashboard'}>داشبورد</Link>} : {};
  
  const items = [
    adminItem,
    {
      key: '2',
      danger: true,
      label: 'خروج',
      onClick: handleLogout
    }
  ];
  
  return (
    <>
      <div
        className="text-white text-captionLg cursor-pointer"
        onClick={() => !isLoggedIn && handleOpenLoginModal()}
      >
        {isLoggedIn ?
          <Dropdown
            trigger={['click']}
            menu={{
              items
            }}
          >
            <Space className="cursor-pointer">
              {`${userInfo?.firstName} ${userInfo?.lastName}`}
              <DownOutlined />
            </Space>
          </Dropdown> :
          'ورود | Login'
        }
      </div>
    </>
  );
};

export default LoginSection;
