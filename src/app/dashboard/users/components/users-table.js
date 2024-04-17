'use client';

import {useRequest} from '@/utils/useRequest';
import {useQueryClient} from '@tanstack/react-query';
import {useEffect, useMemo, useState} from 'react';
import {DateObject} from 'react-multi-date-picker';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian from 'react-date-object/calendars/persian';
import {Button, Col, Form, Input, Modal, Row, Select, Switch, Table, Typography} from 'antd';
import {SearchOutlined} from '@/templates/icons';
import {debounce} from 'lodash';
import dynamic from 'next/dynamic';
import SaveUserForm from './save-user-form';
import {truncatedMiddleText} from '@/utils/helpers';
import {useAxiosClient} from '@/utils/axios/useAxiosClient';
import {EditOutlined} from '@ant-design/icons';
import UserToken from '@/app/dashboard/users/components/user-token';

const DatePicker = dynamic(() => import('@/templates/UI/date-picker').then((mod) => mod.DatePicker), {ssr: false});

const UsersTable = () => {
  const [formRef] = Form.useForm();
  const request = useRequest();
  const queryClient = useQueryClient();
  
  const [filters, setFilters] = useState({pageNumber: 1});
  const [newUserModalOpen, setNewUserModalOpen] = useState(false);
  const [newUserTokenModalOpen, setNewUserTokenModalOpen] = useState(false);
  const [userToken, setUserToken] = useState('');
  const [editUserId, setEditUserId] = useState('');
  const [editUserData, setEditUserData] = useState({});
  
  const handleOnChangeNationalCodeFilter = nationalCode => setFilters(current => ({...current, nationalCode}));
  
  const debouncedOnSearchNationalCode = useMemo(search => debounce(handleOnChangeNationalCodeFilter, 500), []);
  
  const handleOnChangeTokenFilter = token => setFilters(current => ({...current, token}));
  
  const debouncedOnSearchToken = useMemo(search => debounce(handleOnChangeTokenFilter, 500), []);
  
  const {isLoading, data: usersData} = request.useQuery({
    url: '/v1/user',
    params: filters,
    queryKey: ['users-list', filters]
  });
  
  const users = usersData?.response?.users || [];
  const usersCount = usersData?.response?.count || 0;
  
  const axiosClient = useAxiosClient({});
  
  const activateUserAxios = async (userId) => {
    const result = await axiosClient.request(
      {
        method: 'patch',
        url: `/v1/user/activate/${userId}`
      }
    );
    return result?.data;
  };
  
  const deactivateUserAxios = async (userId) => {
    const result = await axiosClient.request(
      {
        method: 'patch',
        url: `/v1/user/deactivate/${userId}`
      }
    );
    return result?.data;
  };
  
  const {mutateAsync: activeUserRequest, isPending: activeUserIsLoading} = request.useMutation({
    mutationFn: variables => activateUserAxios(variables?.userId),
    mutationKey: ['activate-user']
  });
  
  const {mutateAsync: deactivateUserRequest, isPending: deactivateUserIsLoading} = request.useMutation({
    mutationFn: variables => deactivateUserAxios(variables?.userId),
    mutationKey: ['deactivate-user']
  });
  
  
  const handleOnChangeSwitch = async (value, userId) => {
    try {
      if (!value) {
        await deactivateUserRequest({userId});
        queryClient.setQueryData(
          ['users-list', filters],
          oldData => ({
            ...oldData,
            response: {
              ...oldData.response,
              users: oldData?.response?.users?.map(item => {
                if (item?._id === userId) {
                  return {...item, status: 'deactive'};
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
              users: oldData?.response?.users?.map(item => {
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
  
  const handleEditUser = (userId, userData) => {
    setEditUserId(userId);
    setEditUserData(userData);
    setNewUserModalOpen(true);
  };
  
  const columns = [
    {
      title: 'نام و نام خانوادگی',
      align: 'center',
      dataIndex: 'fullName'
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
      dataIndex: 'createdAt',
      render: (createdAt) => new DateObject({
        date: createdAt,
        calendar: gregorian,
        locale: gregorian_en
      }).convert(persian).format('YYYY/MM/DD')
    },
    {
      title: 'توکن',
      align: 'center',
      key: 'token',
      render: (_, {token}) => (
        <Typography.Paragraph
          copyable={{
            text: token
          }}
          className="!text-gray-70 !text-captionSm !m-0"
        >
          {truncatedMiddleText({text: token})}
        </Typography.Paragraph>
      )
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
      dataIndex: '_id',
      render: (userId, row) => <EditOutlined
        className="!text-primary !text-[18px] cursor-pointer"
        onClick={() => handleEditUser(userId, row)}
      />
    }
  ];
  
  const handleOnCloseNewUserModal = () => {
    setEditUserId('');
    setEditUserData({});
    setNewUserModalOpen(false);
  };
  
  const handleOnCloseTokenModal = () => {
    setUserToken('');
    setNewUserTokenModalOpen(false);
  };
  
  useEffect(() => {
    return () => {
      debouncedOnSearchNationalCode.cancel();
      debouncedOnSearchToken.cancel();
    };
  }, []);
  
  return (
    <>
      <Form form={formRef}>
        <Row gutter={11} justify="space-between">
          <Col span={18}>
            <Row gutter={11}>
              <Col span={10}>
                <Form.Item
                  name={'nationalCode'}
                  noStyle
                >
                  <Input
                    placeholder={'جستجو با کد ملی...'}
                    suffix={<SearchOutlined className="!text-gray-40" />}
                    onChange={e => {
                      const value = e?.target?.value;
                      
                      if (!value?.length) {
                        setFilters(current => {
                          const {nationalCode: _, ...rest} = current;
                          
                          return rest;
                        });
                      }
                      else if (value.length >= 3) {
                        debouncedOnSearchNationalCode(value);
                      }
                    }}
                  />
                </Form.Item>
              </Col>
              
              <Col span={14}>
                <Form.Item
                  name={'token'}
                  noStyle
                >
                  <Input
                    placeholder={'جستجو با توکن...'}
                    suffix={<SearchOutlined className="!text-gray-40" />}
                    onChange={e => {
                      const value = e?.target?.value;
                      
                      if (!value?.length) {
                        setFilters(current => {
                          const {token: _, ...rest} = current;
                          
                          return rest;
                        });
                      }
                      else if (value.length >= 3) {
                        debouncedOnSearchToken(value);
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
          loading={isLoading || deactivateUserIsLoading || activeUserIsLoading}
          columns={columns}
          dataSource={users?.filter(user => user?.type !== 'admin')}
          bordered={false}
          pagination={{
            position: ['bottomRight'],
            hideOnSinglePage: true,
            showSizeChanger: false,
            pageSize: 20,
            total: usersCount,
            onChange: pageNumber => setFilters(current => ({...current, pageNumber}))
          }}
          rowKey={'_id'}
        />
      </div>
      
      <Modal
        open={newUserModalOpen}
        onCancel={handleOnCloseNewUserModal}
        maskClosable={false}
        title={editUserId ? 'ویرایش کاربر' : 'ثبت نام کاربر جدید'}
        footer={null}
        className="!w-full md:!w-[85%] !top-[5vh]"
        destroyOnClose
      >
        <SaveUserForm
          handleCloseModal={handleOnCloseNewUserModal}
          editUserId={editUserId}
          editUserData={editUserData}
          setUserToken={setUserToken}
          handleOpenTokenModal={() => setNewUserTokenModalOpen(true)}
        />
      </Modal>
      
      <Modal
        open={newUserTokenModalOpen}
        onCancel={handleOnCloseTokenModal}
        maskClosable={false}
        title={'توکن ورود کاربر'}
        footer={null}
        className="!w-full md:!w-[70%]"
        destroyOnClose
      >
        <UserToken
          handleCloseModal={handleOnCloseTokenModal}
          token={userToken}
        />
      </Modal>
    </>
  );
};

export default UsersTable;
