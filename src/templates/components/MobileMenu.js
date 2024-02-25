import {Col, Menu, Modal, Row, Space} from 'antd';
import calendarIcon from '/public/icons/calendar.svg';
import hotelIcon from '/public/icons/hotel.svg';
import cooperationIcon from '/public/icons/cooperation.svg';
import messagesIcon from '/public/icons/messages.svg';
import Image from 'next/image';
import {useLoginModal} from '@/app/contexts/auth/LoginModalContext';
import {useAuth} from '@/app/contexts/auth/AuthContext';
import Link from 'next/link';
import {useBookVisit} from '@/app/contexts/bookVisit';
import {useRouter} from 'next/navigation';
import CooperationForm from '@/app/(basic)/components/CooperationForm';
import {useState} from 'react';

const MobileMenu = ({handleCloseDrawer}) => {
  const router = useRouter();
  const {handleOpenLoginModal} = useLoginModal();
  const {isLoggedIn, userInfo, handleLogout} = useAuth();
  const {setBookVisitOpen} = useBookVisit();
  
  const [cooperationModalOpen, setCooperationModalOpen] = useState(false);
  
  const adminItem = userInfo?.type === 'admin' ? {key: '1', label: <Link href={'/dashboard'}>داشبورد</Link>} : {};
  
  const loginMenItem = isLoggedIn ?
    {
      label: `${userInfo?.firstName} ${userInfo?.lastName}`,
      icon: <Image
        src={cooperationIcon}
        alt={`${userInfo?.firstName} ${userInfo?.lastName}`}
        priority
        width={30}
        height={34}
        className="max-w-[30px] max-h-[34px]"
      />,
      children: [
        adminItem,
        {
          key: '2',
          danger: true,
          label: 'خروج',
          className: '-----logout [&>span]:!text-[#ff4d4f]',
          onClick: handleLogout
        }
      ]
    } :
    {
      label: 'ورود',
      icon: <Image
        src={cooperationIcon}
        alt={'ورود'}
        priority
        width={30}
        height={34}
        className="max-w-[30px] max-h-[34px]"
      />,
      onClick: () => {
        handleCloseDrawer();
        handleOpenLoginModal();
      }
    };
  
  const menuItems = [
    loginMenItem,
    {
      label: 'رزرو بازدید واحد',
      icon: <Image
        src={calendarIcon}
        alt={'رزرو بازدید واحد'}
        priority
        width={30}
        height={34}
        className="max-w-[30px] max-h-[34px]"
      />,
      onClick: () => {
        handleCloseDrawer();
        setBookVisitOpen(true);
      }
    },
    {
      label: 'پروژه هیراد پالاس',
      icon: <Image
        src={hotelIcon}
        alt={'پروژه هیراد پالاس'}
        priority
        width={30}
        height={34}
        className="max-w-[30px] max-h-[34px]"
      />,
      onClick: () => {
        router.push('/projects/hirad-place');
        handleCloseDrawer();
      }
    },
    {
      label: 'همکاری با هیراد',
      icon: <Image
        src={cooperationIcon}
        alt={'همکاری با هیراد'}
        priority
        width={30}
        height={34}
        className="max-w-[30px] max-h-[34px]"
      />,
      onClick: () => {
        handleCloseDrawer();
        setCooperationModalOpen(true);
      }
    },
    {
      label: 'درباره هیراد',
      icon: <Image
        src={messagesIcon}
        alt={'درباره هیراد'}
        priority
        width={30}
        height={34}
        className="max-w-[30px] max-h-[34px]"
      />
    }
  ];
  
  return (
    <>
      <Menu
        theme={'dark'}
        mode="inline"
        items={menuItems}
        className={'--mobileMenu'}
      />
      
      <Modal
        open={cooperationModalOpen}
        footer={null}
        onCancel={() => setCooperationModalOpen(false)}
        title="همکاری با هیراد"
        className="--customModal !w-full md:!w-[67%]"
        style={{
          top: 10
        }}
        destroyOnClose
      >
        <CooperationForm onCloseModal={() => setCooperationModalOpen(false)} />
      </Modal>
    </>
  );
};

export default MobileMenu;
