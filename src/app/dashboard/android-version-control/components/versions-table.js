'use client';

import {useRequest} from '@/utils/useRequest';
import {useState} from 'react';
import {Button, Col, Modal, Row, Space, Table, Tooltip, Typography} from 'antd';
import {DownloadOutlined, ListDiscFilled} from '@/templates/icons';
import CreateVersionForm from './create-version-form';
import {DateObject} from 'react-multi-date-picker';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian from 'react-date-object/calendars/persian';
import baseURL from '@/utils/axios/baseURL';

const VersionsTable = () => {
  const request = useRequest();
  
  const [newVersionModalOpen, setNewVersionModalOpen] = useState(false);
  
  const {isLoading, data: versionsData} = request.useQuery({
    url: '/v1/android/version',
    params: {
      pageNumber: 1
    },
    queryKey: ['android-version-control-list']
  });
  
  const versions = versionsData?.response?.versions || [];
  const versionsCount = versionsData?.response?.count || 0;
  
  const columns = [
    {
      title: 'شماره ورژن',
      align: 'center',
      dataIndex: 'versionName'
    },
    {
      title: 'نوع آپدیت',
      align: 'center',
      dataIndex: 'isForce',
      render: isForce => isForce ? 'اجباری' : 'اختیاری'
    },
    {
      title: 'تاریخ انتشار',
      align: 'center',
      dataIndex: 'createdAt',
      render: (createdAt) => new DateObject({
        date: createdAt,
        calendar: gregorian,
        locale: gregorian_en
      }).convert(persian).format('YYYY/MM/DD')
    },
    {
      title: 'فایل',
      align: 'center',
      key: 'versionCode',
      dataIndex: 'versionName',
      render: versionName => (
        <Space>
          <Typography.Paragraph
            copyable={{
              text: `${baseURL?._serviceURL}/public/apk/esapp_v${versionName}.apk`
            }}
            className="!m-0 !text-[30px] [&>div>.anticon-copy]:!text-gray-60 --test"
          />
          
          <div className="relative">
            <Tooltip title={'دانلود'}>
              <DownloadOutlined className="!text-[30px] !text-gray-60" />
            </Tooltip>
            <a
              href={`${baseURL?._serviceURL}/public/apk/esapp_v${versionName}.apk`}
              download
              className="absolute inset-0"
            />
          </div>
        </Space>
      )
    }
  ];
  
  const handleOnCloseNewVersionModal = () => setNewVersionModalOpen(false);
  
  const expandedRowRender = (record) => {
    return (
      <>
        <div className="text-gray-100 text-captionSm !font-bold mb-8">
          توضیحات:
        </div>
        
        <Row>
          {record?.updateNotes?.map((item, i) => (
            <Col span={24}>
              <Space>
                <ListDiscFilled className="!text-primary/20 !text-[8px]" />
                
                <div className="text-sm text-gray-100/40">
                  {item}
                </div>
              </Space>
            </Col>
          ))}
        </Row>
      </>
    );
  };
  
  return (
    <>
      <div className="text-end">
        <Button type={'primary'} onClick={() => setNewVersionModalOpen(true)}>
          بارگذاری ورژن جدید
        </Button>
      </div>
      
      <div className="bg-white my-[20px] py-[40px] px-[16px]">
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={versions}
          bordered={false}
          pagination={{
            position: ['bottomRight'],
            hideOnSinglePage: true,
            showSizeChanger: false,
            pageSize: 20,
            total: versionsCount,
            onChange: pageNumber => setFilters(current => ({...current, pageNumber}))
          }}
          rowKey={'_id'}
          expandable={{
            expandedRowRender
          }}
        />
      </div>
      
      <Modal
        open={newVersionModalOpen}
        onCancel={handleOnCloseNewVersionModal}
        maskClosable={false}
        title={'بارگذاری ورژن جدید'}
        footer={null}
        className="!w-full md:!w-[65%] !top-[20px]"
        destroyOnClose
      >
        <CreateVersionForm handleCloseModal={handleOnCloseNewVersionModal} />
      </Modal>
    </>
  );
};

export default VersionsTable;
