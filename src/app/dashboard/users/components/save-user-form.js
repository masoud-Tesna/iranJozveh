import {Badge, Button, Col, Empty, Form, Input, Row, Select, Space, Spin} from 'antd';
import {useRequest} from '@/utils/useRequest';
import {useEffect, useMemo, useState} from 'react';
import {debounce} from 'lodash';
import {handleCreateAntdZodValidator} from '@/utils/helpers';
import {NewUserZod} from '@/app/dashboard/users/schema/new-user';
import {DeleteOutlined} from '@ant-design/icons';
import {useQueryClient} from '@tanstack/react-query';
import starkString from 'starkstring';
import Tabs from '@/templates/components/tabs';

const SaveUserForm = ({handleCloseModal, editUserId, editUserData, setUserToken, handleOpenTokenModal}) => {
  const [formRef] = Form.useForm();
  const request = useRequest();
  const queryClient = useQueryClient();

  const nationalCodeWatch = Form.useWatch('nationalCode', formRef);
  const mobileNumberWatch = Form.useWatch('mobileNumber', formRef);
  const selectedTextbooksWatch = Form.useWatch('selectedTextbooks', formRef) || [];
  const selectedCoursesWatch = Form.useWatch('selectedCourses', formRef) || [];

  const [searchTextbooks, setSearchTextbooks] = useState('');
  const [searchCourse, setSearchCourse] = useState('');

  const [currentTab, setCurrentTab] = useState(0);

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

  const {isLoading: coursesIsLoading, data: coursesData} = request.useQuery({
    url: '/v1/course',
    params: {
      pageNumber: 1,
      search: searchCourse
    },
    queryKey: ['course-list', {pageNumber: 1, search: searchCourse}]
  });

  const courses = coursesData?.response?.courses || [];

  const debounceFetcherTextbook = useMemo(() => debounce(value => (value && value?.length > 2) ? setSearchTextbooks(value) : setSearchTextbooks(''), 500), []);

  const debounceFetcherCourses = useMemo(() => debounce(value => (value && value?.length > 2) ? setSearchCourse(value) : setSearchCourse(''), 500), []);

  const handleDeleteTextbook = textbookId => {
    const selectedTextbooks = formRef.getFieldValue('selectedTextbooks');
    formRef.setFieldValue('selectedTextbooks', selectedTextbooks?.filter(item => item?.value !== textbookId));
  };

  const handleDeleteCourse = courseId => {
    const selectedCourses = formRef.getFieldValue('selectedCourses');
    formRef.setFieldValue('selectedCourses', selectedCourses?.filter(item => item?.value !== courseId));
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

      values.courses = values?.selectedCourses?.map(item => item?.value);

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

      const selectedCoursesError = error?.errorFields?.find(item => item?.name[0] === 'selectedCourses');

      if (selectedTextbooksError?.errors) {
        setCurrentTab(0);

        setTimeout(() => formRef.setFields([
          {
            name: 'searchTextbook',
            errors: selectedTextbooksError?.errors
          }
        ]), 0)
      }

      if (selectedCoursesError?.errors && !selectedTextbooksError?.errors) {
        setCurrentTab(1);
      }

      if (selectedCoursesError?.errors) {
        setTimeout(() => formRef.setFields([
          {
            name: 'searchCourse',
            errors: selectedCoursesError?.errors
          }
        ]), 0)
      }
    }
  };

  useEffect(() => {
    if (editUserId?.length) {
      const {products, courses, ...rest} = editUserData;
      formRef.setFieldsValue({
        ...rest,
        selectedTextbooks: products?.map(item => ({label: item?.name, value: item?._id})),
        selectedCourses: courses?.map(item => ({label: item?.name, value: item?._id})),
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
      title: <Badge count={selectedTextbooksWatch?.length} size={'default'} offset={[0, -7]}>درسنامه</Badge>,
      component: () =>
        <Row>
          <Col span={24}>
            <Form.Item
              name={'searchTextbook'}
              label="درسنامه های مجاز برای این کاربر"
            >
              <Select
                onChange={() => {
                  formRef.setFields([
                    {
                      name: 'searchTextbook',
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
                onSearch={debounceFetcherTextbook}
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

                  formRef.setFieldValue('searchTextbook', null);
                }}
              />
            </Form.Item>
          </Col>

          <Col span={24} className="mt-8">
            <Form.Item
              shouldUpdate={(prevValues, curValues) => prevValues?.selectedTextbooks !== curValues?.selectedTextbooks}
              noStyle
            >
              {({getFieldValue}) => {
                const selectedTextbooks = getFieldValue('selectedTextbooks') || [];

                return (
                  <Row
                    className="text-gray-70 !text-captionMd [&>div]:px-16 [&>div]:h-[56px] [&>div]:leading-[56px] --newUserSelectedCourse"
                  >
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
      title: <Badge count={selectedCoursesWatch?.length} size={'default'} offset={[0, -7]}>ویدئو آموزشی</Badge>,
      component: () => <Row>
        <Col span={24}>
          <Form.Item
              name={'searchCourse'}
              label="ویدئوهای آموزشی مجاز برای این کاربر"
          >
            <Select
                onChange={() => {
                  formRef.setFields([
                    {
                      name: 'searchCourse',
                      errors: []
                    }
                  ]);
                }}
                loading={coursesIsLoading}
                placeholder={'جستجو ویدئو...'}
                showSearch
                filterOption={false}
                notFoundContent={coursesIsLoading ?
                    <Empty description={<Spin size="small" />} /> :
                    <Empty />}
                onSearch={debounceFetcherCourses}
                options={courses?.map(searchedCourse => {
                  return {
                    label: searchedCourse?.name,
                    value: searchedCourse?._id
                  };
                })}
                onSelect={(selectedCourseId, option) => {
                  const oldData = formRef.getFieldValue('selectedCourses') || [];

                  formRef.setFields([
                    {
                      name: 'selectedCourses',
                      value: oldData.find(item => item?.value === selectedCourseId) ? oldData : [...oldData, option]
                    }
                  ]);

                  formRef.setFieldValue('searchCourse', null);
                }}
            />
          </Form.Item>
        </Col>

        <Col span={24} className="mt-8">
          <Form.Item
              shouldUpdate={(prevValues, curValues) => prevValues?.selectedCourses !== curValues?.selectedCourses}
              noStyle
          >
            {({getFieldValue}) => {
              const selectedCourses = getFieldValue('selectedCourses') || [];

              return (
                  <Row
                      className="text-gray-70 !text-captionMd [&>div]:px-16 [&>div]:h-[56px] [&>div]:leading-[56px] --newUserSelectedCourse"
                  >
                    {selectedCourses?.map(course => (
                        <Col span={24} key={course?.value}>
                          <Row align="middle" justify="space-between">
                            <Col>
                              <span className="--listDot"></span>
                              {course?.label}
                            </Col>

                            <Col>
                              <DeleteOutlined
                                  className="!text-red-600 cursor-pointer"
                                  onClick={() => handleDeleteCourse(course?.value)}
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
      key: 'test',
      tabIndex: 2,
      title: 'آزمون',
      component: () => <div>Coming soon</div>
    }
  ];

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

        <Form.Item
            name={'selectedCourses'}
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

          <Col span={24} className="mt-24">
            {tabsItem[currentTab]?.component({})}
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
