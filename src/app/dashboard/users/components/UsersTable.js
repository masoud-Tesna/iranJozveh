'use client';

import {useRequest} from '@/utils/useRequest';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';
import {DateObject} from 'react-multi-date-picker';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian from 'react-date-object/calendars/persian';
import {Button, Col, Form, Input, Modal, Row, Select, Switch, Table} from 'antd';
import {SearchOutlined} from '@/templates/icons';
import debounce from 'lodash.debounce';
import dynamic from 'next/dynamic';
import NewUserForm from './NewUserForm';

const DatePicker = dynamic(() => import('@/templates/UI/DatePicker').then((mod) => mod.DatePicker), {ssr: false});

const UsersTable = () => {
  const [formRef] = Form.useForm();
  const request = useRequest();
  const queryClient = useQueryClient();
  
  const [filters, setFilters] = useState({page: 1});
  const [searchFilter, setSearchFilter] = useState({});
  const [searchBy, setSearchBy] = useState('');
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
  
  const handleOnChangeSearchFilter = (value, searchBy) => {
    setSearchFilter({[searchBy]: value});
  };
  
  const debouncedOnSearch = useMemo((value, searchBy) => {
    return debounce((value, searchBy) => handleOnChangeSearchFilter(value, searchBy), 500);
  }, []);
  
  const {isLoading, data: usersData} = request.useQuery({
    url: 'api/v1/management/users-list',
    params: {...filters, ...searchFilter},
    queryKey: ['users-list', {...filters, ...searchFilter}]
  });
  
  const users = usersData?.response?.foundedUser || [];
  const usersCount = usersData?.response?.count || 0;
  
  const {mutateAsync: banUserRequest, isPending: banUserIsLoading} = request.useMutation({
    url: '/api/v1/management/ban-user',
    method: 'patch',
    mutationKey: ['ban-user']
  });
  
  const {mutateAsync: activeUserRequest, isPending: activeUserIsLoading} = request.useMutation({
    url: '/api/v1/management/activate-user',
    method: 'patch',
    mutationKey: ['activate-user']
  });
  
  const handleOnChangeSwitch = async (value, userId) => {
    try {
      if (!value) {
        await banUserRequest({userId});
        queryClient.setQueryData(
          ['users-list', filters],
          oldData => ({
            ...oldData,
            response: {
              ...oldData.response,
              foundedUser: oldData?.response?.foundedUser?.map(item => {
                if (item?._id === userId) {
                  return {...item, status: 'ban'};
                }
                return item;
              })
            }
          })
        );
      }
      else {
        await activeUserRequest({userId});
        queryClient.setQueryData(
          ['users-list', filters],
          oldData => ({
            ...oldData,
            response: {
              ...oldData.response,
              foundedUser: oldData?.response?.foundedUser?.map(item => {
                if (item?._id === userId) {
                  return {...item, status: 'active'};
                }
                return item;
              })
            }
          })
        );
      }
    } catch (error) {
      console.log('error in handleOnChangeSwitch >>>', error);
    }
  };
  
  const columns = [
    {
      title: 'نام و نام خانوادگی',
      align: 'center',
      key: 'fullName',
      render: (_, row) => `${row?.firstName} ${row?.lastName}`
    },
    {
      title: 'کد ملی',
      align: 'center',
      dataIndex: 'nationalCode'
    },
    {
      title: 'شماره موبایل',
      align: 'center',
      dataIndex: 'mobileNumber'
    },
    {
      title: 'تاریخ ثبت نام',
      dataIndex: 'registerationDate',
      render: (registerationDate) => new DateObject({
        date: registerationDate,
        calendar: gregorian,
        locale: gregorian_en
      }).convert(persian).format('YYYY/MM/DD')
    },
    {
      title: 'توکن',
      align: 'center',
      dataIndex: 'token'
    },
    {
      title: 'وضعیت',
      align: 'center',
      key: 'status',
      dataIndex: 'status',
      render: (status, row) => <Switch
        defaultChecked={status === 'active'}
        checkedChildren="فعال"
        unCheckedChildren="غیر فعال"
        onChange={value => handleOnChangeSwitch(value, row?._id)}
      />
    },
    {
      title: 'ویرایش',
      align: 'center',
      dataIndex: 'token'
    }
  ];
  
  const handleOnCloseNewUserModal = () => setNewUserModalOpen(false);
  
  useEffect(() => {
    return () => {
      debouncedOnSearch.cancel();
    };
  }, []);
  
  return (
    <>
      <Form form={formRef}>
        <Row gutter={11} justify="space-between">
          <Col span={12}>
            <Row gutter={11}>
              <Col span={10}>
                <DatePicker
                  placeholder="تاریخ"
                />
              </Col>
              
              <Col span={14}>
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
            </Row>
          </Col>
          
          <Col>
            <Button type={'primary'} onClick={() => setNewUserModalOpen(true)}>
              ثبت نام کاربر جدید
            </Button>
          </Col>
        </Row>
      </Form>
      
      <div className="bg-white my-[20px] py-[40px] px-[16px]">
        <Table
          loading={isLoading || banUserIsLoading || activeUserIsLoading}
          columns={columns}
          dataSource={users?.filter(user => user?.type !== 'admin')}
          bordered={false}
          pagination={{
            position: ['bottomRight'],
            hideOnSinglePage: true,
            showSizeChanger: false,
            pageSize: 20,
            total: usersCount,
            onChange: page => setFilters(current => ({...current, page}))
          }}
          rowKey={'_id'}
        />
      </div>
      
      <Modal
        open={newUserModalOpen}
        onCancel={handleOnCloseNewUserModal}
        maskClosable={false}
        title="ثبت نام کاربر جدید"
        footer={null}
        className="!w-full md:!w-[85%] !top-[5vh]"
        destroyOnClose
      >
        <NewUserForm onCancel={handleOnCloseNewUserModal} />
      </Modal>
    </>
  );
};

export default UsersTable;
