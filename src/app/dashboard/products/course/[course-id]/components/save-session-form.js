import {Button, Col, Form, Input, Row, Space, Spin} from 'antd';
import {useQueryClient} from '@tanstack/react-query';
import {useRequest} from '@/utils/useRequest';
import {handleCreateAntdZodValidator, toStringObject} from '@/utils/helpers';
import {Upload} from '@/templates/UI';
import baseURL from '@/utils/axios/baseURL';
import {NewSessionZod} from '@/app/dashboard/products/course/[course-id]/schema/new-session';

const SaveSessionForm = ({handleCloseModal, editSessionId, editSessionData, courseId}) => {
  
  const [formRef] = Form.useForm();
  const queryClient = useQueryClient();
  const request = useRequest();
  
  const numberWatch = Form.useWatch('number', formRef);
  const timeWatch = Form.useWatch('time', formRef);
  const descriptionWatch = Form.useWatch('description', formRef);
  
  const handleDeleteVideo = async () => formRef.setFieldsValue({videoFile: undefined});
  
  const {isPending: createSessionIsLoading, mutateAsync: createSessionRequest} = request.useMutation({
    url: `/v1/course/${courseId}/session`,
    formType: 'formData',
    params: {
      number: numberWatch,
      time: timeWatch,
      description: descriptionWatch
    },
    mutationKey: ['createSession', courseId]
  });
  
  const {isPending: updateSessionIsLoading, mutateAsync: updateSessionRequest} = request.useMutation({
    url: `/v1/course/${courseId}/session/${editSessionId}`,
    method: 'patch',
    formType: 'formData',
    params: {
      number: numberWatch,
      time: timeWatch,
      description: descriptionWatch
    },
    mutationKey: ['updateSession', courseId, editSessionData]
  });
  
  const handleOnFinishForm = async () => {
    try {
      await formRef.validateFields();
      
      const video = formRef.getFieldValue('video');
      
      const formData = new FormData;
      
      if (!video?.oldVideo) {
        formData.append('video', video);
      }
      
      
      if (editSessionId && courseId) {
        await updateSessionRequest(formData);
      }
      else {
        await createSessionRequest(formData);
      }
      
      await queryClient.refetchQueries({queryKey: ['sessions-list', courseId]});
      
      await handleCloseModal();
    } catch (error) {
      console.log('error in handleOnFinishForm >>', error);
    }
  };
  
  return (
    <Spin spinning={createSessionIsLoading || updateSessionIsLoading}>
      <Form
        form={formRef}
        layout="vertical"
        initialValues={editSessionId ? {...toStringObject(editSessionData), video: {oldVideo: true}} : {}}
      >
        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name={'number'}
              rules={[handleCreateAntdZodValidator(NewSessionZod)]}
            >
              <Input placeholder="شماره جلسه" />
            </Form.Item>
          </Col>
          
          <Col span={12}>
            <Form.Item
              name={'time'}
              rules={[handleCreateAntdZodValidator(NewSessionZod)]}
            >
              <Input placeholder="مدت زمان (دقیقه)" />
            </Form.Item>
          </Col>
          
          <Col span={24}>
            <Form.Item
              name={'description'}
              rules={[handleCreateAntdZodValidator(NewSessionZod)]}
            >
              <Input.TextArea placeholder={'توضیحات'} rows={4} minLength={10} maxLength={150} showCount />
            </Form.Item>
          </Col>
          
          <Col span={24}>
            <Form.Item
              name="video"
              className="--avatar-uploader-formItem"
              rules={[handleCreateAntdZodValidator(NewSessionZod)]}
            >
              <Upload
                name="video"
                fileType={'video'}
                listType="picture-card"
                editFile={editSessionData?.video ? baseURL?._baseURL + '/public/products/video/' + editSessionData?.video : null}
                showUploadList={false}
                beforeUpload={() => false}
                imageProps={{
                  alt: 'avatar',
                  layout: 'responsive',
                  width: 140,
                  height: 140,
                  className: 'max-w-full max-h-full'
                }}
                uploadButtonTitle={<div className="text-primary-shade-8 text-buttonSm">بارگذاری فایل ویدئو</div>}
                deleteFile
                handleDeleteFile={handleDeleteVideo}
              />
            </Form.Item>
          </Col>
          
          <Col span={24} className="pt-64 text-center">
            <Space>
              <Button className="w-[176px]" onClick={handleCloseModal}>
                لغو
              </Button>
              
              <Button type="primary" className="w-[176px]" onClick={handleOnFinishForm}>
                {editSessionId ? 'ویرایش جلسه' : 'ایجاد جلسه'}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default SaveSessionForm;
