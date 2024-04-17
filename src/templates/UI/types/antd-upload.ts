import { UploadProps } from 'antd/es/upload';
import { ReactNode } from 'react';
import { ImageProps } from 'next/image';
import { RcFile } from 'antd/es/upload/interface';

export type TUploadProps = UploadProps & {
  uploadButtonTitle: string | ReactNode
  imageProps?: Omit<ImageProps, 'src'>,
  handleReturnResponse: (response: any) => void,
  deleteFile?: boolean,
  handleDeleteFile?: () => Promise<void>,
  fileType?: 'image' | 'pdf' | 'apk' | 'video',
  editFile?: string,
  beforeUploadFile: (file: any) => Promise<void>;
}
