import {Button, Col, Form, Input, Row, Select, Space} from 'antd';
import {SearchOutlined} from '@/templates/icons';

const NewProductForm = ({onCancel}) => {
  return (
    <Form
      layout="vertical"
    >
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item
            name={'category'}
          >
            <Select placeholder="دسته محصول" />
          </Form.Item>
        </Col>
        
        <Col span={12}>
          <Form.Item
            name={'productName'}
          >
            <Input placeholder="نام محصول" />
          </Form.Item>
        </Col>
        
        <Col span={12}>
          <Form.Item
            name={'pageNumber'}
          >
            <Input placeholder="تعداد صفحات" />
          </Form.Item>
        </Col>
        
        <Col span={12}>
          <Form.Item
            name={'price'}
          >
            <Input placeholder="قیمت" />
          </Form.Item>
        </Col>
        
        <Col span={24}>
          <Form.Item
            name={'description'}
          >
            <Input.TextArea placeholder={'توضیحات'} rows={4} />
          </Form.Item>
        </Col>
        
        <Col span={24}>
          <Col span={18}>
          
          </Col>
          
          <Col span={6}>
          
          </Col>
        </Col>
        
        <Col span={24} className="pt-64 text-center">
          <Space>
            <Button className="w-[176px]" onClick={onCancel}>
              لغو
            </Button>
            
            <Button type="primary" className="w-[176px]">
              ایجاد محصول
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default NewProductForm;
