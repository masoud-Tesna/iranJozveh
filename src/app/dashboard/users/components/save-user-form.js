import {Button, Col, Empty, Form, Input, Row, Select, Space, Spin} from 'antd';
import {useRequest} from '@/utils/useRequest';
import {useEffect, useMemo, useState} from 'react';
import {debounce} from 'lodash';
import {handleCreateAntdZodValidator} from '@/utils/helpers';
import {NewUserZod} from '@/app/dashboard/users/schema/new-user';
import {DeleteOutlined} from '@ant-design/icons';
import {useQueryClient} from '@tanstack/react-query';
import starkString from 'starkstring';
import Tabs from "@/templates/components/tabs";

const SaveUserForm = ({handleCloseModal, editUserId, editUserData, setUserToken, handleOpenTokenModal}) => {
  const [formRef] = Form.useForm();
  const request = useRequest();
  const queryClient = useQueryClient();

  const nationalCodeWatch = Form.useWatch('nationalCode', formRef);
  const mobileNumberWatch = Form.useWatch('mobileNumber', formRef);

  const [searchTextbooks, setSearchTextbooks] = useState('');

  const [currentTab, setCurrentTab] = useState(0)

  const {
    data: textbooksData,
    isLoading: textbooksIsLoading
  } = request.useQuery({
    url: '/v1/textbook',
    params: {
      pageNumber: 1,
      search: searchTextbooks
    },
    queryKey: ['textbook', {pageNumber: 1, search: searchTextbooks}]
  });

  const textbooks = textbooksData?.response?.products || [];

  const debounceFetcher = useMemo(() => debounce(setSearchTextbooks, 500), []);

  const handleDeleteTextbook = textbookId => {
    const selectedTextbooks = formRef.getFieldValue('selectedTextbooks');
    formRef.setFieldValue('selectedTextbooks', selectedTextbooks?.filter(item => item?.value !== textbookId));
  };

  const {isPending: createCustomerIsLoading, mutateAsync: createCustomerRequest} = request.useMutation({
    url: '/v1/customer',
    mutationKey: ['createCustomer']
  });

  const {isPending: updateCustomerIsLoading, mutateAsync: updateCustomerRequest} = request.useMutation({
    url: `/v1/customer/${editUserId}`,
    method: 'patch',
    mutationKey: ['updateCustomer']
  });

  const handleOnFinishForm = async () => {
    try {
      await formRef.validateFields();

      const values = formRef.getFieldsValue(true);

      values.products = values?.selectedTextbooks?.map(item => item?.value);

      if (editUserId) {
        await updateCustomerRequest(values);
      }
      else {
        const res = await createCustomerRequest(values);
        setUserToken(res?.response?.token);
      }

      await queryClient.refetchQueries({queryKey: ['users-list']});

      if (!editUserId) {
        await handleOpenTokenModal();
      }

      await handleCloseModal();

    } catch (error) {
      const selectedTextbooksError = error?.errorFields?.find(item => item?.name[0] === 'selectedTextbooks');

      if (selectedTextbooksError?.errors) {
        formRef.setFields([
          {
            name: 'search',
            errors: selectedTextbooksError?.errors
          }
        ]);
      }
    }
  };

  useEffect(() => {
    if (editUserId?.length) {
      console.log(editUserData)
      const {products, ...rest} = editUserData;
      formRef.setFieldsValue({
        ...rest,
        selectedTextbooks: products?.map(item => ({label: item?.name, value: item?._id}))
      });
    }
  }, [editUserId]);

  useEffect(() => {
    if (nationalCodeWatch?.length) {
      formRef.setFields([
        {
          name: 'nationalCode',
          value: starkString(nationalCodeWatch).englishNumber().parseNumber().toString(),
          errors: []
        }
      ]);
    }

  }, [nationalCodeWatch]);

  useEffect(() => {
    if (mobileNumberWatch?.length) {
      formRef.setFields([
        {
          name: 'mobileNumber',
          value: starkString(mobileNumberWatch).englishNumber().parseNumber().toString(),
          errors: []
        }
      ]);
    }
  }, [mobileNumberWatch]);

  const tabsItem = [
    {
      key: 'textbook',
      tabIndex: 0,
      title: 'درسنامه',
      component: () =>
      <Row>
        <Col span={24}>
          <Form.Item
              name={'search'}
              label="درسنامه های مجاز برای این کاربر"
          >
            <Select
                onChange={() => {
                  formRef.setFields([
                    {
                      name: 'search',
                      errors: []
                    }
                  ]);
                }}
                loading={textbooksIsLoading}
                placeholder={'جستجو درسنامه...'}
                showSearch
                filterOption={false}
                notFoundContent={textbooksIsLoading ?
                    <Empty description={<Spin size="small" />} /> :
                    <Empty />}
                onSearch={debounceFetcher}
                options={textbooks?.map(searchedTextbook => {
                  return {
                    label: searchedTextbook?.name,
                    value: searchedTextbook?._id
                  };
                })}
                onSelect={(selectedTextbookId, option) => {
                  const oldData = formRef.getFieldValue('selectedTextbooks') || [];

                  formRef.setFields([
                    {
                      name: 'selectedTextbooks',
                      value: oldData.find(item => item?.value === selectedTextbookId) ? oldData : [...oldData, option]
                    }
                  ]);

                  formRef.setFieldValue('search', null);
                }}
            />
          </Form.Item>
        </Col>

        <Col span={24} className='mt-8'>
          <Form.Item
              shouldUpdate={(prevValues, curValues) => prevValues?.selectedTextbooks !== curValues?.selectedTextbooks}
              noStyle
          >
            {({getFieldValue}) => {
              const selectedTextbooks = getFieldValue('selectedTextbooks') || [];

              return (
                  <Row className="text-gray-70 !text-captionMd [&>div]:px-16 [&>div]:h-[56px] [&>div]:leading-[56px] --newUserSelectedCourse">
                    {selectedTextbooks?.map(textbook => (
                        <Col span={24} key={textbook?.value}>
                          <Row align="middle" justify="space-between">
                            <Col>
                              <span className="--listDot"></span>
                              {textbook?.label}
                            </Col>

                            <Col>
                              <DeleteOutlined
                                  className="!text-red-600 cursor-pointer"
                                  onClick={() => handleDeleteTextbook(textbook?.value)}
                              />
                            </Col>
                          </Row>
                        </Col>
                    ))}
                  </Row>
              );
            }}
          </Form.Item>
        </Col>
      </Row>

    },
    {
      key: 'course',
      tabIndex: 1,
      title: 'ویدئو آموزشی',
      component: () => <div>Course</div>
    },
    {
      key: 'test',
      tabIndex: 2,
      title: 'آزمون',
      component: () => <div>Test</div>
    }
  ]

  return (
    <Spin spinning={createCustomerIsLoading || updateCustomerIsLoading}>
      <Form
        layout="vertical"
        form={formRef}
      >
        <Form.Item
          name={'selectedTextbooks'}
          rules={[handleCreateAntdZodValidator(NewUserZod)]}
          hidden
        />

        <Row gutter={8}>
          <Col span={12}>
            <Form.Item
              name={'fullName'}
              rules={[handleCreateAntdZodValidator(NewUserZod)]}
            >
              <Input placeholder="نام و نام خانوادگی" />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name={'nationalCode'}
              rules={[handleCreateAntdZodValidator(NewUserZod)]}
            >
              <Input placeholder="کد ملی" maxLength={10} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              name={'mobileNumber'}
              rules={[handleCreateAntdZodValidator(NewUserZod)]}
            >
              <Input placeholder="شماره موبایل" maxLength={11} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Tabs items={tabsItem} current={currentTab} onChange={setCurrentTab} />
          </Col>

          <Col span={24} className='mt-24'>
            { tabsItem[ currentTab ]?.component({})}
          </Col>

          <Col span={24} className="pt-64 text-center">
            <Space>
              <Button className="w-[176px]" onClick={handleCloseModal}>
                لغو
              </Button>

              <Button
                type="primary"
                className="w-[176px]"
                onClick={handleOnFinishForm}
              >
                {editUserId ? 'ویرایش حساب کاربری' : 'ایجاد حساب کاربری'}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Spin>
  );
};

export default SaveUserForm;
