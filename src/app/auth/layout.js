'use client';

import {Suspense, useEffect, useState} from 'react';
import {Col, Row} from 'antd';
import Image from 'next/image';
import {AuthSkeleton} from '@/templates/components';

import appLogo from '/public/images/logo.svg';
import logoWithTransparent from '/public/images/logoWithTransparent.svg';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/app/context/auth/AuthContext';

const AuthLayout = ({children}) => {
  const router = useRouter();
  const {isLoggedIn} = useAuth();
  
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard/users');
      setLoading(false);
    }
    else {
      setLoading(false);
    }
  }, [isLoggedIn]);
  
  if (loading || isLoggedIn) {
    return <AuthSkeleton layout />;
  }
  
  return (
    <Row
      className="h-full"
      align={'stretch'}
    >
      <Col span={12}>
        <Row gutter={[0, 32]}>
          <Col
            span={24}
            className="text-center pt-[65px]"
          >
            <Image
              priority
              src={appLogo}
              alt={'Iran Jozveh'}
              layout="responsive"
              className="max-w-[81px]"
            />
          </Col>
          
          <Col
            span={24}
            className="pb-[15px] px-[4%] md:px-[5.5%] lg:px-[6.5%]"
          >
            <Suspense fallback={<AuthSkeleton justInputs />}>
              {children}
            </Suspense>
          </Col>
        </Row>
      </Col>
      
      <Col
        span={12}
        className="bg-[url('/images/authBg.png')] bg-no-repeat bg-cover max-lg:bg-center"
      >
        <div className="!h-full bg-auth opacity-70 flex justify-center align-middle">
          <Image
            src={logoWithTransparent}
            className="w-[50%] m-auto"
            alt="Iran jozveh"
          />
        </div>
      </Col>
    </Row>
  );
};

export default AuthLayout;
