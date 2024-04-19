import {Button, Col, Form, Input, Row, Space, Spin} from 'antd';
import {useQueryClient} from '@tanstack/react-query';
import {useRequest} from '@/utils/useRequest';
import {handleCreateAntdZodValidator} from '@/utils/helpers';
import {useEffect} from 'react';
import {Upload} from '@/templates/UI';
import baseURL from '@/utils/axios/baseURL';
import {NewCourseZod} from '@/app/dashboard/products/course/schema/new-course';
import {setInputRule} from '@/utils/setInputRule';

const SaveCourseForm = ({handleCloseModal, editCourseId, editCourseData}) => {

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
              'imageUploadTypesError',
              {inputName: 'تصویر درسنامه', types: 'JPG/PNG'}
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
              {inputName: 'تصویر درسنامه', size: '500 کیلوبایت'}
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

  const {isPending: createCourseIsLoading, mutateAsync: createCourseRequest} = request.useMutation({
    url: '/v1/course',
    mutationKey: ['createCourse']
  });

  const {isPending: updateCourseIsLoading, mutateAsync: updateCourseRequest} = request.useMutation({
    url: `/v1/course/${editCourseId}`,
    method: 'patch',
    mutationKey: ['updateCourse']
  });

  const handleOnFinishForm = async () => {
    try {
      await formRef.validateFields();

      const values = formRef.getFieldsValue(true);

      if (editCourseId) {
        await updateCourseRequest(values);
      }
      else {
        await createCourseRequest(values);
      }

      await queryClient.refetchQueries({queryKey: ['course-list']});

      await handleCloseModal();
    } catch (error) {
      console.log('error in handleOnFinishForm >>', error);
    }
  };

  useEffect(() => {
    if (editCourseId?.length) {
      formRef.setFieldsValue({
        ...editCourseData,
        price: `${editCourseData?.price}`
      });
    }
  }, [editCourseId]);

  return (
    <Spin spinning={createCourseIsLoading || updateCourseIsLoading}>
      <Form
        form={formRef}
        layout="vertical"
      >
        <Row gutter={8}>
          <Col span={24}>
            <Form.Item
              name={'name'}
              rules={[handleCreateAntdZodValidator(NewCourseZod)]}
            >
              <Input placeholder="نام دوره" maxLength={30} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name={'price'}
              rules={[handleCreateAntdZodValidator(NewCourseZod)]}
            >
              <Input placeholder="قیمت" />
            </Form.Item>
          </Col>

          <Col span={18}>
            <Form.Item
              name={'description'}
              rules={[handleCreateAntdZodValidator(NewCourseZod)]}
            >
              <Input.TextArea placeholder={'توضیحات'} rows={4} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name="image"
              className="--avatar-uploader-formItem"
              rules={[handleCreateAntdZodValidator(NewCourseZod)]}
            >
              <Upload
                  uploadIconFull
                name="image"
                listType="picture-card"
                action={'/v1/product/upload/image'}
                handleReturnResponse={uploadResponse => {
                  formRef.setFields([
                    {
                      name: 'image',
                      value: uploadResponse?.imageName
                    }
                  ]);
                }}
                editFile={editCourseData?.image ? baseURL?._baseURL + '/public/products/image/' + editCourseData?.image : null}
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
                deleteFile
                handleDeleteFile={handleDeleteImage}
              />
            </Form.Item>
          </Col>

          <Col span={24} className="pt-64 text-center">
            <Space>
              <Button className="w-[176px]" onClick={handleCloseModal}>
                لغو
              </Button>

              <Button type="primary" className="w-[176px]" onClick={handleOnFinishForm}>
                {editCourseId ? 'ویرایش دوره' : 'ایجاد دوره'}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default SaveCourseForm;
