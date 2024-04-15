import {Button, Col, Row} from 'antd';
import appLogo from '/public/images/logo.svg';
import Image from 'next/image';
import AndroidNewVersionAnimation from '@/app/android/components/android-new-version-animation';
import NewVersionDetails from '@/app/android/components/new-version-details';
import DownloadNewVersion from '@/app/android/components/download-new-version';

export const metadata = {
  title: 'دریافت آخرین نسخه اندروید'
};

const AndroidPage = async () => {
  return (
    <Row justify={'center'} className="min-h-full flex-1 flex flex-col">
      <Col
        xs={24}
        md={12}
        lg={10}
        xl={8}
        xxl={7}
        className="[&>div>div]:px-24 [&>div>div]:md:px-[4%] bg-white pb-48"
      >
        <Row className="h-full">
          <Col span={24} className="!min-h-[calc(100%-84px)]">
            <div className="h-full bg-gray-200">
              <div className="py-32 shadow-10 relative z-50 bg-white -mx-24 md:mx-[-4%] px-24 md:px-[4%]">
                <Row justify={'space-between'} align={'middle'}>
                  <Col className="text-gray-100 !text-captionXl !font-bold">
                    بروزرسانی برنامه
                  </Col>
                  
                  <Col>
                    <Image
                      priority
                      src={appLogo}
                      alt={'Iran Jozveh'}
                      layout="responsive"
                      className="max-w-[50px]"
                    />
                  </Col>
                </Row>
              </div>
              
              <div className="pt-32 bg-white">
                <AndroidNewVersionAnimation />
              </div>
              
              <div className="mt-16">
                <NewVersionDetails />
              </div>
            </div>
          </Col>
          
          <Col span={24} className="mt-24 self-end">
            <DownloadNewVersion />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AndroidPage;
