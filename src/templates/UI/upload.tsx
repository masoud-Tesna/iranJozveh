'use client';

import { Upload as AntdUpload } from 'antd';
import Image from 'next/image';
import { Children, FC, useState } from 'react';
import { UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { getBase64 } from '@/utils/helpers';
import { LoadingOutlined, FilePdfOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { TUploadProps } from '@/templates/UI/types';
import { AndroidOutlined, TrashFilled } from '@/templates/icons';
import { useRequest } from '@/utils/useRequest';

export const Upload: FC<TUploadProps> = ({
  onChange,
  className,
  imageProps,
  handleReturnResponse,
  deleteLogo = false,
  asPdfFile = false,
  asApkFile = false,
  beforeUploadFile,
  editFile,
  children,
  ...rest
}) => {
  const request = useRequest();
  
  const [imageUrl, setImageUrl] = useState<string>(editFile ? editFile : '');
  
  //@ts-ignore
  const { isPending: isLoading, mutateAsync: uploadFileRequest } = request.useMutation({
    url: rest?.action,
    method: rest?.method,
    formType: 'formData',
    mutationKey: ['uploadFile', rest?.action]
  });
  
  const handleChange: UploadProps['onChange'] = async (info: UploadChangeParam<UploadFile>) => {
    try {
      await beforeUploadFile(info.file);
      
      const formData = new FormData;
      
      //@ts-ignore
      formData.append(rest?.name, info.file);
      
      const res = await uploadFileRequest(formData);
      
      getBase64(info?.file, (url: any) => {
        setImageUrl(url);
      });
      
      handleReturnResponse(res?.response);
    }
    
    catch (error) {
      console.log('error upload .>', error);
    }
  };
  
  const handleDeleteLogo = async () => {
    if (rest?.handleDeleteLogo) {
      await rest?.handleDeleteLogo();
      setImageUrl('');
    }
  };
  
  const uploadButton = (
    <div className="border-dashed border border-neutral-gray-4 w-full h-full flex justify-center items-center flex-col gap-y-2 p-2">
      <div>
        { rest.uploadButtonTitle }
      </div>
      
      <div>
        { isLoading && <LoadingOutlined /> }
      </div>
    </div>
  );
  
  return (
    <AntdUpload
      onChange={ handleChange }
      className={ classNames(
        className,
        '--avatar-uploader',
        { '[&>div>span]:p-[11px]': !imageUrl },
        { '--removeLogo': deleteLogo && imageUrl }
        // { '[&>div>span]:pointer-events-none': deleteLogo && imageUrl }
      ) }
      disabled={ !!(deleteLogo && imageUrl) }
      { ...rest }
    >
      { Children.count(children) ?
        <>
          { children }
          
          { deleteLogo &&
            <TrashFilled
              className="--trashIcon !text-white !text-[24px] z-10 pointer-events-auto"
              onClick={ handleDeleteLogo }
            /> }
        </> :
        (
          <>
            { imageUrl ?
              (
                asPdfFile ?
                  <FilePdfOutlined className="!text-[70px] !text-primary" />
                  :
                  asApkFile ?
                    <AndroidOutlined className="!text-[70px] !text-primary" />
                    :
                    <Image
                      src={ imageUrl }
                      { ...imageProps }
                      alt={ imageProps?.alt || '' }
                    />
              ) :
              uploadButton }
            
            { deleteLogo &&
              <TrashFilled
                className="--trashIcon !text-white !text-[24px] z-10 pointer-events-disabled"
                onClick={ handleDeleteLogo }
              /> }
          </>
        )
      }
    </AntdUpload>
  );
};
