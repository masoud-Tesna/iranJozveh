import {Button, Col, Form, Input, Row, Space} from 'antd';
import {SearchOutlined} from '@/templates/icons';

const NewUserForm = ({onCancel}) => {
  return (
    <Form
      layout="vertical"
    >
      <Row gutter={8}>
        <Col span={6}>
          <Form.Item
            name={'firstName'}
          >
            <Input placeholder="نام" />
          </Form.Item>
        </Col>
        
        <Col span={6}>
          <Form.Item
            name={'lastName'}
          >
            <Input placeholder="نام خانوادگی" />
          </Form.Item>
        </Col>
        
        <Col span={6}>
          <Form.Item
            name={'nationalCode'}
          >
            <Input placeholder="کد ملی" />
          </Form.Item>
        </Col>
        
        <Col span={6}>
          <Form.Item
            name={'mobileNumber'}
          >
            <Input placeholder="شماره موبایل" />
          </Form.Item>
        </Col>
        
        <Col span={24}>
          <Form.Item
            name={'search'}
            label="درسنامه های مجاز برای این کاربر"
          >
            <Input
              placeholder={'جستجو درسنامه...'}
              suffix={<SearchOutlined className="!text-gray-40" />}
            />
          </Form.Item>
        </Col>
        
        <Col span={24} className="mt-8">
          <Row className="text-gray-100 !text-captionMd [&>div]:px-16 [&>div]:h-[56px] [&>div]:leading-[56px] --newUserSelectedCourse">
            <Col span={24}>
              <span className="--listDot"></span>
              انسان در اسلام شهید مطهری
            </Col>
            
            <Col span={24}>
              <span className="--listDot"></span>
              علوم تربیتی کودکان
            </Col>
            
            <Col span={24}>
              <span className="--listDot"></span>
              علوم تربیتی کودکان
            </Col>
            
            <Col span={24}>
              <span className="--listDot"></span>
              علوم تربیتی کودکان
            </Col>
          </Row>
        </Col>
        
        <Col span={24} className="pt-64 text-center">
          <Space>
            <Button className="w-[176px]" onClick={onCancel}>
              لغو
            </Button>
            
            <Button type="primary" className="w-[176px]">
              ایجاد حساب کاربری
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default NewUserForm;
