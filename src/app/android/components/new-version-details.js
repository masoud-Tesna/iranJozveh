'use client';

import {Col, Row, Skeleton} from 'antd';
import ChangesVersion from './changes-version';
import {useRequest} from '@/utils/useRequest';
import {DateObject} from 'react-multi-date-picker';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const NewVersionDetails = () => {
  const request = useRequest();
  
  const {data, isLoading} = request.useQuery({
    url: '/v1/android/version/latest',
    gcTime: 1000,
    queryKey: ['android-latest-version']
  });
  
  const versionDetails = data?.response?.version;
  
  return (
    <Row gutter={[0, 20]} className="py-24 px-24 md:px-[5%]">
      {isLoading ?
        <Col span={24}>
          <Skeleton />
        </Col> :
        <>
          <Col span={24} className="text-center text-primary/50">
            <div className="text-captionXl !font-bold">
              نسخه {versionDetails?.versionName}
            </div>
            
            <div className="text-xs">
              {new DateObject({
                date: versionDetails?.createdAt,
                calendar: gregorian,
                locale: gregorian_en
              }).convert(persian, persian_fa).format('DD MMMM YYYY')}
            </div>
          </Col>
          
          <Col span={24}>
            <div className="text-gray-100 text-captionSm !font-bold mb-8">
              آخرین تغییرات در این نسخه:
            </div>
            
            <ChangesVersion details={versionDetails?.updateNotes} />
          </Col>
        </>
      }
    </Row>
  );
};

export default NewVersionDetails;
