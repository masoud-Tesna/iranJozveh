'use client';

import {Col, Form, Row, Upload as AntdUpload} from 'antd';
import Image from 'next/image';
import {Children, FC, useState} from 'react';
import {UploadChangeParam, UploadProps} from 'antd/es/upload';
import {getBase64} from '@/utils/helpers';
import {FilePdfOutlined, LoadingOutlined, VideoCameraFilled} from '@ant-design/icons';
import classNames from 'classnames';
import {TUploadProps} from '@/templates/UI/types';
import {AndroidOutlined, TrashFilled, UploadFilled} from '@/templates/icons';
import {useRequest} from '@/utils/useRequest';

export const Upload: FC<TUploadProps> = ({
  onChange,
  className,
  imageProps,
  handleReturnResponse,
  deleteFile = false,
  fileType = 'image',
  beforeUploadFile,
  editFile,
  children,
  uploadIconFull = false,
  ...rest
}) => {
  const formRef = Form.useFormInstance();

  const request = useRequest();

  const [imageUrl, setImageUrl] = useState<string>(editFile ? editFile : '');

  //@ts-ignore
  const { isPending: isLoading, mutateAsync: uploadFileRequest } = request.useMutation({
    url: rest?.action,
    method: rest?.method,
    formType: 'formData',
    mutationKey: ['uploadFile', rest?.action]
  });

  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam) => {
    try {
      if (fileType === 'video') {
        //@ts-ignore
        formRef.setFieldsValue({ [rest?.name]: info?.file });

        setImageUrl('uploaded');
      }
      else {
        await beforeUploadFile(info.file);

        const formData = new FormData;

        //@ts-ignore
        formData.append(rest?.name as any, info.file);

        const res = await uploadFileRequest(formData);

        getBase64(info?.file, (url: any) => setImageUrl(url));

        handleReturnResponse(res?.response);
      }
    }
    catch (error) {
      console.log('error upload .>', error);
    }
  };

  const handleOnDeleteUploadedFile = async () => {
    if (rest?.handleDeleteFile) {
      await rest?.handleDeleteFile();
      setImageUrl('');
    }
  };

  const uploadSpan = uploadIconFull ? { span: 24 } : {};

  const uploadButton = (
    <div className="border-dashed border border-neutral-gray-4 w-full h-full px-2 py-8">
      <Row align={ 'middle' } justify={ 'space-between' } gutter={ [8, 8] } className="h-full">
        <Col { ...uploadSpan }>
          { rest.uploadButtonTitle }
        </Col>

        <Col { ...uploadSpan }>
          { isLoading ? <LoadingOutlined /> : <UploadFilled className="!text-[33px] !text-gray-60" /> }
        </Col>
      </Row>


      {/*
       { rest.uploadButtonTitle }
       */ }

      {/*
       { isLoading ? <LoadingOutlined /> : <UploadFilled className='!text-[33px] !text-gray-60' /> }
       */ }

    </div>
  );

  const iconForAfterUpload = {
    image: <Image
      src={ imageUrl }
      { ...imageProps }
      alt={ imageProps?.alt || '' }
    />,
    pdf: <FilePdfOutlined className="!text-[70px] !text-primary" />,
    apk: <AndroidOutlined className="!text-[70px] !text-primary" />,
    video: <VideoCameraFilled className="!text-[70px] !text-primary" />
  };

  return (
    <AntdUpload
      onChange={ handleChange }
      className={ classNames(
        className,
        '--avatar-uploader',
        { '--asImageType': fileType === 'image' },
        { '[&>div>span]:p-[11px]': !imageUrl },
        { '--removeLogo': deleteFile && imageUrl }
        // { '[&>div>span]:pointer-events-none': deleteFile && imageUrl }
      ) }
      disabled={ !!(deleteFile && imageUrl) }
      { ...rest }
    >
      { Children.count(children) ?
        <>
          { children }

          { deleteFile &&
            <TrashFilled
              className="--trashIcon !text-white !text-[24px] z-10 pointer-events-auto"
              onClick={ handleOnDeleteUploadedFile }
            /> }
        </> :
        (
          <>
            { imageUrl ?
              iconForAfterUpload[fileType] :
              uploadButton }

            { deleteFile &&
              <TrashFilled
                className="--trashIcon !text-white !text-[24px] z-10 pointer-events-disabled"
                onClick={ handleOnDeleteUploadedFile }
              /> }
          </>
        )
      }
    </AntdUpload>
  );
};

const ShowComponent = () => {
  return (
    <div>
      <div>
        #1
      </div>

      <div>
        #2
      </div>
    </div>
  );
};
