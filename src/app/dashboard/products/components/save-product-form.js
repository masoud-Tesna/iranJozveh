import {Button, Col, Form, Input, Row, Select, Space, Spin} from 'antd';
import {handleCreateAntdZodValidator, setInputRule} from '@/utils/helpers';
import {NewProductZod} from '@/app/dashboard/products/schema/new-product';
import {Upload} from '@/templates/UI';
import baseURL from '@/utils/axios/baseURL';
import {useAuth} from '@/app/context/auth/auth-context';
import {useRequest} from '@/utils/useRequest';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';

const SaveProductForm = ({handleCloseModal, editProductId, editProductData}) => {
  const {tokenInfo} = useAuth();
  const [formRef] = Form.useForm();
  const queryClient = useQueryClient();
  const request = useRequest();
  
  const beforeUploadImage = async (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    
    if (!isJpgOrPng) {
      formRef.setFields([
        {
          name: 'image',
          errors: [
            setInputRule(
              'imageUploadTypeError',
              {inputName: 'تصویر محصول', types: 'JPG/PNG'}
            )
          ]
        }
      ]);
      return Promise.reject('image unsupported filetype');
    }
    else {
      formRef.setFields([
        {
          name: 'image',
          errors: []
        }
      ]);
    }
    
    const isLt2M = file.size / 1024 / 1024 < 0.5;
    
    if (!isLt2M) {
      formRef.setFields([
        {
          name: 'image',
          errors: [
            setInputRule(
              'imageUploadSizeError',
              {inputName: 'تصویر محصول', size: '500 کیلوبایت'}
            )
          ]
        }
      ]);
      return Promise.reject('image unsupported size');
    }
    else {
      formRef.setFields([
        {
          name: 'image',
          errors: []
        }
      ]);
    }
    
    return Promise.resolve();
  };
  
  const handleDeleteImage = async () => formRef.setFieldsValue({image: undefined});
  
  const beforeUploadPdf = async (file) => {
    const isPdf = file.type === 'application/pdf';
    
    if (!isPdf) {
      formRef.setFields([
        {
          name: 'file',
          errors: [setInputRule('imageUploadTypeError', {inputName: 'فایل PDF', types: 'PDF'})]
        }
      ]);
      
      return Promise.reject('pdf unsupported filetype');
    }
    else {
      formRef.setFields([
        {
          name: 'file',
          errors: []
        }
      ]);
    }
    
    return Promise.resolve();
  };
  
  const handleDeletePdf = async () => formRef.setFieldsValue({file: undefined});
  
  const {isPending: createProductIsLoading, mutateAsync: createProductRequest} = request.useMutation({
    url: '/api/v1/product/textbook',
    mutationKey: ['createProduct']
  });
  
  const {isPending: updateProductIsLoading, mutateAsync: updateProductRequest} = request.useMutation({
    url: `/api/v1/product/textbook/${editProductId}`,
    method: 'patch',
    mutationKey: ['updateProduct']
  });
  
  const handleOnFinishForm = async () => {
    try {
      await formRef.validateFields();
      
      const values = formRef.getFieldsValue(true);
      
      if (editProductId) {
        await updateProductRequest(values);
      }
      else {
        await createProductRequest(values);
      }
      
      await queryClient.refetchQueries({queryKey: ['products-list']});
      
      await handleCloseModal();
    } catch (error) {
      console.log('error in handleOnFinishForm >>', error);
    }
  };
  
  console.log('editProductData >>>', editProductData);
  
  useEffect(() => {
    if (editProductId?.length) {
      formRef.setFieldsValue({
        ...editProductData,
        pageCount: `${editProductData?.pageCount}`,
        price: `${editProductData?.price}`
      });
    }
  }, [editProductId]);
  
  return (
    <Spin spinning={createProductIsLoading || updateProductIsLoading}>
      <Form
        form={formRef}
        layout="vertical"
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name={'category'}
              rules={[handleCreateAntdZodValidator(NewProductZod)]}
            >
              <Select placeholder="دسته محصول" options={[{label: 'درس نامه', value: 'textbook'}]} />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name={'name'}
              rules={[handleCreateAntdZodValidator(NewProductZod)]}
            >
              <Input placeholder="نام محصول" maxLength={30} />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name={'pageCount'}
              rules={[handleCreateAntdZodValidator(NewProductZod)]}
            >
              <Input placeholder="تعداد صفحات" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name={'price'}
              rules={[handleCreateAntdZodValidator(NewProductZod)]}
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
          
          <Col span={18}>
            <Form.Item
              name="file"
              className="--avatar-uploader-formItem"
              rules={[handleCreateAntdZodValidator(NewProductZod)]}
            >
              <Upload
                name="pdf"
                asPdfFile
                listType="picture-card"
                action={'/api/v1/product/textbook/upload/pdf'}
                handleReturnResponse={uploadResponse => {
                  formRef.setFields([
                    {
                      name: 'file',
                      value: uploadResponse?.pdfName
                    }
                  ]);
                }}
                editFile={editProductData?.file ? baseURL?._baseURL + '/api/public/products/pdf/' + editProductData?.file : null}
                showUploadList={false}
                accept={'.pdf'}
                beforeUpload={() => false}
                beforeUploadFile={beforeUploadPdf}
                imageProps={{
                  alt: 'avatar',
                  layout: 'responsive',
                  width: 140,
                  height: 140,
                  className: 'max-w-full max-h-full'
                }}
                uploadButtonTitle={<div className="text-primary-shade-8 text-buttonSm">بارگذاری فایل</div>}
                deleteLogo
                handleDeleteLogo={handleDeletePdf}
              />
            </Form.Item>
          </Col>
          
          <Col span={6}>
            <Form.Item
              name="image"
              className="--avatar-uploader-formItem"
              rules={[handleCreateAntdZodValidator(NewProductZod)]}
            >
              <Upload
                name="image"
                listType="picture-card"
                action={'/api/v1/product/upload/image'}
                handleReturnResponse={uploadResponse => {
                  formRef.setFields([
                    {
                      name: 'image',
                      value: uploadResponse?.imageName
                    }
                  ]);
                }}
                editFile={editProductData?.image ? baseURL?._baseURL + '/api/public/products/image/' + editProductData?.image : null}
                showUploadList={false}
                accept={'.png, .jpg, .jpeg'}
                beforeUpload={() => false}
                beforeUploadFile={beforeUploadImage}
                imageProps={{
                  alt: 'avatar',
                  layout: 'responsive',
                  width: 140,
                  height: 140,
                  className: 'max-w-full max-h-full'
                }}
                uploadButtonTitle={<div className="text-primary-shade-8 text-buttonSm">بارگذاری تصویر</div>}
                deleteLogo
                handleDeleteLogo={handleDeleteImage}
              />
            </Form.Item>
          </Col>
          
          <Col span={24} className="pt-64 text-center">
            <Space>
              <Button className="w-[176px]" onClick={handleCloseModal}>
                لغو
              </Button>
              
              <Button type="primary" className="w-[176px]" onClick={handleOnFinishForm}>
                {editProductId ? 'ویرایش محصول' : 'ایجاد محصول'}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default SaveProductForm;
