'use client';

import {Col, Row, Space} from 'antd';
import {ListDiscFilled} from '@/templates/icons';

const ChangesVersion = ({details = []}) => {
  return (
    <Row>
      {details?.map((item, i) => (
        <Col key={i} span={24}>
          <Space>
            <ListDiscFilled className="!text-primary/20 !text-[8px]" />
            
            <div className="text-sm text-gray-100/40">
              {item}
            </div>
          </Space>
        </Col>
      ))}
    </Row>
  );
};

export default ChangesVersion;
