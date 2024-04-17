'use client';

import {useRequest} from '@/utils/useRequest';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select, Switch, Table} from 'antd';
import {SearchOutlined} from '@/templates/icons';
import {debounce} from 'lodash';
import dynamic from 'next/dynamic';
import SaveTextbookForm from './save-textbook-form';
import {formatNumber} from '@/utils/helpers';
import baseURL from '@/utils/axios/baseURL';
import {EditOutlined, FilePdfOutlined} from '@ant-design/icons';
import Image from 'next/image';

const DatePicker = dynamic(() => import('@/templates/UI/date-picker').then((mod) => mod.DatePicker), {ssr: false});

const TextbookTable = () => {
  const [formRef] = Form.useForm();
  const request = useRequest();
  
  const [filters, setFilters] = useState({pageNumber: 1});
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);
  const [editProductId, setEditProductId] = useState('');
  const [editProductData, setEditProductData] = useState({});
  
  const handleOnChangeSearchFilter = search => setFilters(current => ({...current, search}));
  
  const debouncedOnSearch = useMemo(search => debounce(handleOnChangeSearchFilter, 500), []);
  
  const {isLoading, data: productsData} = request.useQuery({
    url: '/v1/textbook',
    params: filters,
    queryKey: ['textbook-list', filters]
  });
  
  const products = productsData?.response?.products || [];
  const productsCount = productsData?.response?.count || 0;
  
  const handleEditProduct = (userId, userData) => {
    setEditProductId(userId);
    setEditProductData(userData);
    setNewProductModalOpen(true);
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
      title: 'کد درسنامه',
      align: 'center',
      dataIndex: 'code'
    },
    {
      title: 'نام درسنامه',
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
      render: (productId, row) => <EditOutlined
        className="!text-primary !text-[18px] cursor-pointer"
        onClick={() => handleEditProduct(productId, row)}
      />
    }
  ];
  
  const handleOnCloseNewProductModal = () => {
    setEditProductId('');
    setEditProductData({});
    setNewProductModalOpen(false);
  };
  
  useEffect(() => () => debouncedOnSearch.cancel(), []);
  
  return (
    <>
      <Form form={formRef}>
        <Row gutter={11} justify="space-between">
          <Col span={8}>
            <Form.Item
              name={'search'}
              noStyle
            >
              <Input
                placeholder={'جستجو...'}
                suffix={<SearchOutlined className="!text-gray-40" />}
                onChange={e => {
                  const value = e?.target?.value;
                  
                  if (!value?.length) {
                    setFilters(current => {
                      const {search: _, ...rest} = current;
                      
                      return rest;
                    });
                  }
                  else if (value.length >= 3) {
                    debouncedOnSearch(value);
                  }
                }}
              />
            </Form.Item>
          </Col>
          
          <Col>
            <Button type={'primary'} onClick={() => setNewProductModalOpen(true)}>
              افزودن درسنامه جدید
            </Button>
          </Col>
        </Row>
      </Form>
      
      <div className="bg-white my-[20px] py-[40px] px-[16px]">
        <Table
          loading={isLoading}
          columns={columns}
          dataSource={products}
          bordered={false}
          pagination={{
            position: ['bottomRight'],
            hideOnSinglePage: true,
            showSizeChanger: false,
            pageSize: 20,
            total: productsCount,
            onChange: pageNumber => setFilters(current => ({...current, pageNumber}))
          }}
          rowKey={'_id'}
        />
      </div>
      
      <Modal
        open={newProductModalOpen}
        onCancel={handleOnCloseNewProductModal}
        maskClosable={false}
        title={editProductId ? 'ویرایش درسنامه' : 'افزودن درسنامه جدید'}
        footer={null}
        className="!w-full md:!w-[65%] !top-[20px]"
        destroyOnClose
      >
        <SaveTextbookForm
          handleCloseModal={handleOnCloseNewProductModal}
          editProductId={editProductId}
          editProductData={editProductData}
        />
      </Modal>
    </>
  );
};

export default TextbookTable;
