'use client';

import {Col, Layout, Row} from 'antd';
import Image from 'next/image';
import logo from '/public/logo.svg';
import locationIcon from '/public/icons/location.svg';
import phoneIcon from '/public/icons/phone.svg';
import emailIcon from '/public/icons/email.svg';

const Footer = () => {
  return (
    <Layout.Footer className="!bg-black !p-0">
      <Row>
        <Col span={24} className="bg-gray-10 bg-gray py-[8px] px-[10px]">
          <Row gutter={8} align="middle">
            <Col xs={0} md={4} className="text-center">
              <Image
                src={logo}
                alt="Hirad Construction Company"
                width={50}
                height={80}
                layout={'responsive'}
                priority
                className="max-w-[50px]"
              />
            </Col>
            
            <Col xs={24} sm={16} md={10} lg={16}>
              <Row gutter={8} justify={'space-between'} align={'middle'}>
                <Col xs={24} lg={12} className="max-md:!hidden">
                  <Row gutter={20} align={'middle'}>
                    <Col flex="70px">
                      <Image
                        src={locationIcon}
                        alt="Hirad Construction Company"
                        width={50}
                        height={50}
                        layout={'responsive'}
                        priority
                      />
                    </Col>
                    
                    <Col flex="1 1" className="[&>div]:text-black [&>div]:text-captionLg [&>div]:py-[12px]">
                      <div className="border-solid border-0 border-b border-gray-30 inline-block">
                        تهران، شهرک غرب، خیابان گل افشان، پلاک 84
                      </div>
                      
                      <div className="max-md:hidden">
                        Tehran, Shahrak-e gharb, Gol afshan Ave.
                      </div>
                    </Col>
                  </Row>
                </Col>
                
                <Col xs={24} lg={6} className="[&>div]:py-[12px]">
                  <Row
                    gutter={20}
                    align={'middle'}
                    className="border-solid border-0 border-b border-gray-30 [&>div]:text-captionLg [&>div]:text-black md:!hidden"
                  >
                    <Col flex="1 1">
                      تهران، شهرک غرب، خیابان گل افشان، پلاک 84
                    </Col>
                    
                    <Col flex="50px" className="max-md:order-first">
                      <Image
                        src={locationIcon}
                        alt="Hirad Construction Company"
                        width={50}
                        height={50}
                        layout={'responsive'}
                        priority
                      />
                    </Col>
                  </Row>
                  
                  <Row
                    gutter={20}
                    align={'middle'}
                    className="border-solid border-0 border-b border-gray-30 [&>div]:text-captionLg [&>div]:text-black"
                  >
                    <Col flex="1 1">
                      021-880912912
                    </Col>
                    
                    <Col flex="50px" className="max-md:order-first">
                      <Image
                        src={phoneIcon}
                        alt="Hirad Construction Company"
                        width={31}
                        height={31}
                        layout={'responsive'}
                        priority
                      />
                    </Col>
                  </Row>
                  
                  <Row gutter={20} align={'middle'}>
                    <Col flex="1 1">
                      info@hirad-group.ir
                    </Col>
                    
                    <Col flex="50px" className="max-md:order-first">
                      <Image
                        src={emailIcon}
                        alt="Hirad Construction Company"
                        width={31}
                        height={31}
                        layout={'responsive'}
                        priority
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        
        <Col
          span={24}
          className="text-center h-[40px] leading-[40px] d-ltr"
        >
          <div className="text-captionSm md:text-captionMd text-white h-full !leading-[40px]">
            Hirad-Group.ir – Copyright © 2023 – All rights reserved.
          </div>
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;
