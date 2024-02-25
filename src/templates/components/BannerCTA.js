'use client';

import classNames from 'classnames';
import {Col, Modal, Row, Space} from 'antd';
import Image from 'next/image';

import calendarIcon from '/public/icons/calendar.svg';
import hotelIcon from '/public/icons/hotel.svg';
import cooperationIcon from '/public/icons/cooperation.svg';
import messagesIcon from '/public/icons/messages.svg';
import {useBookVisit} from '@/app/contexts/bookVisit';
import {useRouter} from 'next/navigation';
import CooperationForm from '@/app/(basic)/components/CooperationForm';
import {useState} from 'react';


export const dynamic = 'force-dynamic';

const BannerCTA = () => {
  const router = useRouter();
  
  const {setBookVisitOpen} = useBookVisit();
  
  const [cooperationModalOpen, setCooperationModalOpen] = useState(false);
  
  const borderClassName = '[&>div:not(:last-child)]:text-center [&>div:not(:last-child)]:border-solid [&>div:not(:last-child)]:border-0 [&>div:not(:last-child)]:border-e [&>div:not(:last-child)]:border-gray-30';
  
  return (
    <>
      <Row
        className={classNames('w-full bg-white py-[18px] shadow-1 [&>.ant-col]:text-center', borderClassName)}
        justify={'center'}
      >
        <Col xs={12} md={6} className="max-md:!border-0">
          <CTALink
            text={{persian: 'رزرو بازدید واحد', english: 'Book Visit'}}
            icon={{path: calendarIcon, width: 50, height: 54}}
            onClick={() => setBookVisitOpen(true)}
          />
        </Col>
        
        <Col xs={12} md={6}>
          <CTALink
            text={{persian: 'پروژه هیراد پالاس', english: 'Hirad Palace'}}
            icon={{path: hotelIcon, width: 50, height: 54}}
            onClick={() => router.push('/projects/hirad-palace')}
          />
        </Col>
        
        <Col xs={0} md={6}>
          <CTALink
            text={{persian: 'همکاری با هیراد', english: 'Cooperation'}}
            icon={{path: cooperationIcon, width: 50, height: 54}}
            onClick={() => setCooperationModalOpen(true)}
          />
        </Col>
        
        <Col xs={0} md={6}>
          <CTALink
            text={{persian: 'درباره هیراد', english: 'About Hirad'}}
            icon={{path: messagesIcon, width: 50, height: 54}}
          />
        </Col>
      </Row>
      
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

const CTALink = ({text, icon, onClick}) => {
  return (
    <Space onClick={onClick} className="cursor-pointer select-none">
      <div className="[&>div]:text-center [&>div]:text-captionLg [&>div]:md:text-captionXl">
        <div className="text-black truncate">{text?.persian}</div>
        
        <div className="text-gray-40 truncate">{text?.english}</div>
      </div>
      
      <div>
        <Image
          src={icon?.path}
          alt={text?.persian}
          priority
          width={50}
          height={54}
          className="max-w-[50px] max-h-[54px]"
        />
      </div>
    </Space>
  );
};

export default BannerCTA;
