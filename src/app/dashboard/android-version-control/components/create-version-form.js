import {Button, Col, Form, Input, Row, Select, Space, Spin, Switch} from 'antd';
import {handleCreateAntdZodValidator, setInputRule} from '@/utils/helpers';
import {NewProductZod} from '@/app/dashboard/products/textbook/schema/new-product';
import {useRequest} from '@/utils/useRequest';
import {NewVersionZod} from '@/app/dashboard/android-version-control/schema/new-version';
import {AddCircleFilled, MinusCircleFilled} from '@/templates/icons';
import {Fragment} from 'react';
import {DeleteOutlined, UploadOutlined} from '@ant-design/icons';
import classNames from 'classnames';
import {Upload} from '@/templates/UI';
import baseURL from '@/utils/axios/baseURL';
import {useQueryClient} from '@tanstack/react-query';

const CreateVersionForm = ({handleCloseModal}) => {
  const [formRef] = Form.useForm();
  const querClient = useQueryClient();
  const request = useRequest();
  
  const {isPending: isLoading, mutateAsync: createVersionRequest} = request.useMutation({
    url: '/v1/android/version',
    mutationKey: ['upload-new-version']
  });
  
  const handleOnFinishForm = async () => {
    try {
      await formRef.validateFields();
      
      const values = formRef.getFieldsValue(true);
      
      await createVersionRequest(values);
      
      await querClient.refetchQueries({queryKey: ['android-version-control-list']});
      
      await handleCloseModal();
    } catch (error) {
      console.log('error in handleOnFinishForm >>', error);
    }
  };
  
  return (
    <Spin spinning={isLoading}>
      <Form
        form={formRef}
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name={'versionName'}
              rules={[handleCreateAntdZodValidator(NewVersionZod)]}
            >
              <Input placeholder={'شماره ورژن'} />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Row justify={'start'} gutter={16}>
              <Col className="mt-8 text-gray-40 text-captionLg">
                فورس آپدیت:
              </Col>
              <Col className="mt-4">
                <Form.Item
                  name={'isForce'}
                  rules={[handleCreateAntdZodValidator(NewVersionZod)]}
                  initialValue={false}
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Col>
            </Row>
          
          </Col>
          
          <Col span={24}>
            <div className="text-gray-40 text-captionLg mb-8">
              توضیحات:
            </div>
            
            <Form.List name={'updateNotes'} initialValue={['']}>
              {(fields, {add, remove}) => (
                <Row gutter={24} align="stretch">
                  {fields.map(({key, name, ...restField}) => (
                    <Fragment key={'updateNotes_' + key}>
                      <Col span={20}>
                        <Form.Item
                          {...restField}
                          name={name}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      
                      <Col span={2}>
                        <AddCircleFilled onClick={() => add()} className="!text-neutral-gray-8 text-[40px] mt-4" />
                      </Col>
                      
                      {key > 0 &&
                        <Col span={2}>
                          <MinusCircleFilled
                            onClick={() => remove(name)}
                            className="!text-neutral-gray-8 text-[40px] mt-4"
                          />
                        </Col>
                      }
                    </Fragment>
                  ))}
                </Row>
              )}
            </Form.List>
          </Col>
          
          <Col span={24}>
            <Form.Item
              shouldUpdate={(prevValues, curValues) => prevValues?.versionName !== curValues?.versionName}
              noStyle
            >
              {({getFieldValue}) => {
                const versionName = getFieldValue('versionName') || '';
                
                const beforeUploadApk = async (file) => {
                  console.log('file >>>>', file);
                  const isApk = file.name.includes('.apk');
                  
                  if (!isApk) {
                    formRef.setFields([
                      {
                        name: 'apk',
                        errors: [setInputRule('imageUploadTypeError', {inputName: 'فایل نصبی', types: 'APK'})]
                      }
                    ]);
                    
                    return Promise.reject('apk unsupported filetype');
                  }
                  else {
                    formRef.setFields([
                      {
                        name: 'apk',
                        errors: []
                      }
                    ]);
                  }
                  
                  return Promise.resolve();
                };
                
                return (
                  <Form.Item
                    name="apk"
                    className="--avatar-uploader-formItem"
                  >
                    <Upload
                      name="apk"
                      asApkFile
                      listType="picture-card"
                      action={`/v1/android/upload/apk/?versionCode=${versionName}`}
                      showUploadList={false}
                      accept={'.apk'}
                      beforeUpload={() => false}
                      beforeUploadFile={beforeUploadApk}
                      imageProps={{
                        alt: 'avatar',
                        layout: 'responsive',
                        width: 140,
                        height: 140,
                        className: 'max-w-full max-h-full'
                      }}
                      disabled={!versionName?.length}
                      uploadButtonTitle={
                        <div className="text-primary-shade-8 text-buttonSm">بارگذاری فایل نصبی اپلیکیشن</div>}
                    />
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Col>
          
          <Col span={24} className="pt-64 text-center">
            <Space>
              <Button className="w-[176px]" onClick={handleCloseModal}>
                لغو
              </Button>
              
              <Button type="primary" className="w-[176px]" onClick={handleOnFinishForm}>
                بارگذاری
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default CreateVersionForm;
