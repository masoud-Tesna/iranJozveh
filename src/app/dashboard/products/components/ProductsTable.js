'use client';

import {useRequest} from '@/utils/useRequest';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select, Switch, Table} from 'antd';
import {SearchOutlined} from '@/templates/icons';
import debounce from 'lodash.debounce';
import dynamic from 'next/dynamic';
import NewProductForm from './NewProductForm';

const DatePicker = dynamic(() => import('@/templates/UI/DatePicker').then((mod) => mod.DatePicker), {ssr: false});

const ProductsTable = () => {
  const [formRef] = Form.useForm();
  const request = useRequest();
  
  const [filters, setFilters] = useState({page: 1});
  const [searchFilter, setSearchFilter] = useState({});
  const [searchBy, setSearchBy] = useState('');
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);
  
  const handleOnChangeSearchFilter = (value, searchBy) => {
    setSearchFilter({[searchBy]: value});
  };
  
  const debouncedOnSearch = useMemo((value, searchBy) => {
    return debounce((value, searchBy) => handleOnChangeSearchFilter(value, searchBy), 500);
  }, []);
  
  const {isLoading, data: productssData} = request.useQuery({
    url: 'api/v1/management/products-list',
    params: {...filters, ...searchFilter},
    queryKey: ['products-list', {...filters, ...searchFilter}]
  });
  
  const products = productssData?.response?.products || [];
  const productsCount = productssData?.response?.count || 0;
  
  const columns = [
    {
      title: 'کد محصول',
      align: 'center',
      dataIndex: 'productCode'
    },
    {
      title: 'نام محصول',
      align: 'center',
      dataIndex: 'productName'
    },
    {
      title: 'قیمت',
      align: 'center',
      dataIndex: 'price'
    },
    {
      title: 'فایل',
      align: 'center',
      dataIndex: 'fileName'
    },
    {
      title: '',
      align: 'center',
      dataIndex: 'action'
    }
  ];
  
  const handleOnCloseNewProductModal = () => setNewProductModalOpen(false);
  
  useEffect(() => {
    return () => debouncedOnSearch.cancel();
  }, []);
  
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
                    setSearchFilter({});
                  }
                  else {
                    if (searchBy === 'mobileNumber') {
                      if (value.length >= 4 && value.length <= 11) {
                        debouncedOnSearch(value, 'mobileNumber');
                      }
                    }
                    else if (['firstName', 'lastName', 'realstateName'].includes(searchBy)) {
                      if (value.length >= 2) {
                        debouncedOnSearch(value, searchBy);
                      }
                    }
                  }
                }}
                onFocus={() => {
                  if (!searchBy?.length) {
                    return document.getElementById('searchByField').focus(
                    );
                  }
                }}
              />
            </Form.Item>
          </Col>
          
          <Col>
            <Button type={'primary'} onClick={() => setNewProductModalOpen(true)}>
              افزودن محصول جدید
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
            onChange: page => setFilters(current => ({...current, page}))
          }}
          rowKey={'_id'}
        />
      </div>
      
      <Modal
        // open={newProductModalOpen}
        open
        onCancel={handleOnCloseNewProductModal}
        maskClosable={false}
        title="افزودن محصول جدید"
        footer={null}
        className="!w-full md:!w-[65%]"
        destroyOnClose
      >
        <NewProductForm onCancel={handleOnCloseNewProductModal} />
      </Modal>
    </>
  );
};

export default ProductsTable;
