'use client';

import {Badge, Button, Modal, Table} from 'antd';
import Image from 'next/image';
import baseURL from '@/utils/axios/baseURL';
import {EditOutlined, EyeFilled, FilePdfOutlined, VideoCameraFilled} from '@ant-design/icons';
import {formatNumber} from '@/utils/helpers';
import {useRequest} from '@/utils/useRequest';
import {useState} from 'react';
import SaveCourseForm from '@/app/dashboard/products/course/components/save-course-form';
import Link from 'next/link';

const CoursesTable = () => {
  const request = useRequest();
  
  const [filters, setFilters] = useState({pageNumber: 1});
  const [newCourseModalOpen, setNewCourseModalOpen] = useState(false);
  const [editCourseId, setEditCourseId] = useState('');
  const [editCourseData, setEditCourseData] = useState({});
  
  const {isLoading, data: coursesData} = request.useQuery({
    url: '/v1/course',
    params: filters,
    queryKey: ['course-list', filters]
  });
  
  const courses = coursesData?.response?.courses || [];
  const coursesCount = coursesData?.response?.count || 0;
  
  const handleEditCourse = (userId, userData) => {
    setEditCourseId(userId);
    setEditCourseData(userData);
    setNewCourseModalOpen(true);
  };
  
  const handleOnCloseNewCourseModal = () => {
    setEditCourseId('');
    setEditCourseData({});
    setNewCourseModalOpen(false);
  };
  
  const columns = [
    {
      title: 'تصویر',
      align: 'center',
      dataIndex: 'image',
      render: (image) => (
        image ?
          <Image src={baseURL?._baseURL + '/public/products/image/' + image} alt="" width={40} height={40} /> :
          <span className="p-8 bg-neutral-gray-4 border-solid border-[.5px] border-neutral-gray-8 rounded-full">
            <FilePdfOutlined className="!text-primary !text-[25px]" />
          </span>
      )
    },
    {
      title: 'نام دوره',
      align: 'center',
      dataIndex: 'name'
    },
    {
      title: 'قیمت',
      align: 'center',
      dataIndex: 'price',
      render: price => formatNumber(price)
    },
    {
      title: 'ویرایش',
      align: 'center',
      dataIndex: '_id',
      key: 'edit',
      render: (productId, row) => <EditOutlined
        className="!text-primary !text-[18px] cursor-pointer"
        onClick={() => handleEditCourse(productId, row)}
      />
    },
    {
      title: 'جلسات',
      align: 'center',
      dataIndex: '_id',
      key: 'meetings',
      render: (productId, row) => <Badge count={row?.sessionCount} size={'default'} color={'green'}>
        <Link href={`/dashboard/products/course/${productId}`}>
          <VideoCameraFilled
            className="!text-primary !text-[22px]"
          />
        </Link>
      </Badge>
    }
  ];
  
  return (
    <>
      <div className="text-end">
        <Button type={'primary'} onClick={() => setNewCourseModalOpen(true)}>
          افزودن دوره جدید
        </Button>
      </div>
      
      <div className="bg-white my-[20px] py-[40px] px-[16px]">
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={courses}
          bordered={false}
          pagination={{
            position: ['bottomRight'],
            hideOnSinglePage: true,
            showSizeChanger: false,
            pageSize: 20,
            total: coursesCount,
            onChange: pageNumber => setFilters(current => ({...current, pageNumber}))
          }}
          rowKey={'_id'}
        />
      </div>
      
      <Modal
        open={newCourseModalOpen}
        onCancel={handleOnCloseNewCourseModal}
        maskClosable={false}
        title={editCourseId ? 'ویرایش دوره' : 'افزودن دوره جدید'}
        footer={null}
        className="!w-full md:!w-[65%] !top-[20px]"
        destroyOnClose
      >
        <SaveCourseForm
          handleCloseModal={handleOnCloseNewCourseModal}
          editCourseId={editCourseId}
          editCourseData={editCourseData}
        />
      </Modal>
    </>
  );
};

export default CoursesTable;
