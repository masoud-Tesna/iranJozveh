'use client';

import {Button, Col, Modal, Row, Space, Table} from 'antd';
import {EditOutlined, FilePdfOutlined, LoadingOutlined} from '@ant-design/icons';
import {useRequest} from '@/utils/useRequest';
import {useState} from 'react';
import {useParams} from 'next/navigation';
import SaveSessionForm from './save-session-form';
import Image from 'next/image';
import baseURL from '@/utils/axios/baseURL';

const SessionsTable = () => {
  const request = useRequest();
  const params = useParams();
  
  const courseId = params['course-id'];
  
  const [filters, setFilters] = useState({pageNumber: 1});
  const [newSessionModalOpen, setNewSessionModalOpen] = useState(false);
  const [editSessionId, setEditSessionId] = useState('');
  const [editSessionData, setEditSessionData] = useState({});
  const [showProcessingModalOpen, setShowProcessingModalOpen] = useState({});
  
  const {isLoading, data: sessionsData} = request.useQuery({
    url: `/v1/course/${courseId}/sessions`,
    params: filters,
    queryKey: ['sessions-list', courseId, filters],
    enabled: !!courseId
  });
  
  const {
    isPending: lastProcessOnCreateBtnIsLoading,
    mutateAsync: getLastProcessOnCreateBtnRequest
  } = request.useMutation({
    url: '/v1/course/process/ongoing',
    method: 'get',
    showMessage: false,
    mutationKey: ['getLastProcessStatusOnCreate']
  });
  
  const {
    isPending: lastProcessOnUpdateBtnIsLoading,
    mutateAsync: getLastProcessOnUpdateBtnRequest
  } = request.useMutation({
    url: '/v1/course/process/ongoing',
    method: 'get',
    showMessage: false,
    mutationKey: ['getLastProcessStatusOnUpdate']
  });
  
  const sessions = sessionsData?.response?.sessions || [];
  const sessionsCount = sessionsData?.response?.count || 0;
  
  const handleEditSession = (sessionId, sessionData) => {
    setEditSessionId(sessionId);
    setEditSessionData(sessionData);
    setNewSessionModalOpen(true);
  };
  
  const handleOnCloseNewSessionModal = () => {
    setEditSessionId('');
    setEditSessionData({});
    setNewSessionModalOpen(false);
  };
  
  const uploadedVideoStatus = {
    unknown: 'نا مشخص',
    uploaded: 'بارگذاری شده',
    processing: 'در حال پردازش',
    processed: 'پردازش شده',
    transferring: 'در حال انتقال به هاست دانلود',
    transferred: 'انتقال ه هاست دانلود انجام شده',
    failedTransfer: 'انتقال به هاست دانلود ناموفق',
    ready: 'آماده برای نمایش',
    failedProcess: 'پردازش ناموفق'
  };
  
  const columns = [
    {
      title: 'تصویر',
      align: 'center',
      dataIndex: 'image',
      render: (image) => (
        image ?
          <Image src={baseURL?._baseURL + '/public/sessionImage/' + image} alt="" width={40} height={40} /> :
          <span
            className="p-8 bg-neutral-gray-4 border-solid border-[.5px] border-neutral-gray-8 rounded-full"
          >
            <FilePdfOutlined className="!text-primary !text-[22px] !align-middle" />
          </span>
      )
    },
    {
      title: 'شماره جلسه',
      align: 'center',
      dataIndex: 'number',
      render: number => `جلسه ${number}`
    },
    {
      title: 'مدت زمان',
      align: 'center',
      dataIndex: 'time',
      render: time => `${time} دقیقه`
    },
    {
      title: 'توضیحات',
      align: 'center',
      dataIndex: 'description'
    },
    {
      title: 'وضعیت',
      align: 'center',
      dataIndex: 'status',
      render: status => uploadedVideoStatus[status] || uploadedVideoStatus?.unknown
    },
    {
      title: 'ویرایش',
      align: 'center',
      dataIndex: '_id',
      key: 'edit',
      render: (sessionId, record) =>
        <>
          <EditOutlined
            className="!text-primary !text-[18px] cursor-pointer"
            onClick={async () => {
              const res = await getLastProcessOnUpdateBtnRequest();
              
              const isProcessOngoing = res?.response?.isProcessOngoing;
              
              if (isProcessOngoing) {
                setShowProcessingModalOpen({
                  show: true,
                  for: 'update',
                  sessionId,
                  record
                });
              }
              else {
                setShowProcessingModalOpen({});
                handleEditSession(sessionId, record);
              }
            }}
          />
          {lastProcessOnUpdateBtnIsLoading ? <LoadingOutlined /> : null}
        </>
    }
  ];
  
  return (
    <>
      <Row justify={'space-between'} align={'middle'}>
        <Col>
          جلسات دوره
        </Col>
        
        <Col>
          <Button
            loading={lastProcessOnCreateBtnIsLoading}
            type={'primary'}
            onClick={async () => {
              const res = await getLastProcessOnCreateBtnRequest();
              
              const isProcessOngoing = res?.response?.isProcessOngoing;
              
              if (isProcessOngoing) {
                setShowProcessingModalOpen({
                  show: true,
                  for: 'create'
                });
              }
              else {
                setShowProcessingModalOpen({});
                setNewSessionModalOpen(true);
              }
            }}
          >
            افزودن جلسه جدید
          </Button>
        </Col>
      </Row>
      
      <div className="bg-white my-[20px] py-[40px] px-[16px]">
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={sessions}
          bordered={false}
          pagination={{
            position: ['bottomRight'],
            hideOnSinglePage: true,
            showSizeChanger: false,
            pageSize: 20,
            total: sessionsCount,
            onChange: pageNumber => setFilters(current => ({...current, pageNumber}))
          }}
          rowKey={'_id'}
        />
      </div>
      
      <Modal
        open={newSessionModalOpen}
        onCancel={handleOnCloseNewSessionModal}
        maskClosable={false}
        title={editSessionId ? 'ویرایش جلسه' : 'افزودن جلسه جدید'}
        footer={null}
        className="!w-full md:!w-[55%] !top-[20px]"
        destroyOnClose
      >
        <SaveSessionForm
          handleCloseModal={handleOnCloseNewSessionModal}
          editSessionId={editSessionId}
          editSessionData={editSessionData}
          courseId={courseId}
        />
      </Modal>
      
      <Modal
        open={showProcessingModalOpen?.show}
        onCancel={() => setShowProcessingModalOpen({})}
        maskClosable={false}
        title={'در حال پردازش'}
        footer={null}
        className="!w-full md:!w-[55%] "
        destroyOnClose
      >
        {!!showProcessingModalOpen?.show && showProcessingModalOpen?.for === 'create' &&
          <ShowProcessingForCreate setShowProcessingModalOpen={setShowProcessingModalOpen} />}
        
        {!!showProcessingModalOpen?.show && showProcessingModalOpen?.for === 'update' &&
          <ShowProcessingForUpdate
            showProcessingModalOpen={showProcessingModalOpen}
            setShowProcessingModalOpen={setShowProcessingModalOpen}
            handleEditSession={handleEditSession}
          />}
      </Modal>
    </>
  );
};

const ShowProcessingForCreate = ({setShowProcessingModalOpen}) => {
  return (
    <Row>
      <Col span={24} className="text-neutral-black2 text-captionXl2 text-center">
        در حال حاظر ویدئویی در حال پرازش است! لطفا در زمانی دیگر مجددا تلاش کنید.
      </Col>
      
      <Col span={24} className="pt-64 text-center">
        <Button className="w-[176px]" onClick={() => setShowProcessingModalOpen({})}>
          متوجه شدم
        </Button>
      </Col>
    </Row>
  );
};

const ShowProcessingForUpdate = ({showProcessingModalOpen, setShowProcessingModalOpen, handleEditSession}) => {
  return (
    <Row>
      <Col span={24} className="text-neutral-black2 text-captionXl2 text-center">
        در حال حاظر ویدئویی در حال پرازش است! در حال حاظر امکان ویرایش ویدئو جلسه وجود ندارد اما باقی فیلدها
        قابل ویرایش می‌باشد.
      </Col>
      
      <Col span={24} className="pt-64 text-center">
        <Space>
          <Button
            type="primary"
            className="w-[176px]" onClick={() => {
            handleEditSession(showProcessingModalOpen?.sessionId, showProcessingModalOpen?.record);
            setShowProcessingModalOpen({});
          }}
          >
            ویرایش
          </Button>
          
          <Button className="w-[176px]" onClick={() => setShowProcessingModalOpen({})}>
            متوجه شدم
          </Button>
        </Space>
      </Col>
    </Row>
  );
};

export default SessionsTable;
