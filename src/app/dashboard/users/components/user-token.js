import {Button, Col, Row, Space} from 'antd';
import {useCopyToClipboard} from 'react-use';
import {useState} from 'react';

const UserToken = ({handleCloseModal, token}) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  
  const handleOnCopyToken = () => {
    copyToClipboard(token);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  
  return (
    <Row>
      <Col span={24} className="bg-primary/10 py-[12vh] px-[5vw] text-center text-neutral-black2 !text-captionXl">
        {token}
      </Col>
      
      <Col span={24} className="pt-64 text-center">
        <Space>
          <Button className="w-[176px]" onClick={handleCloseModal}>
            لغو
          </Button>
          
          <Button
            type="primary"
            className="w-[176px]"
            onClick={handleOnCopyToken}
          >
            {copied ? 'کپی شد' : 'کپی'}
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default UserToken;
