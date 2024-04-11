import {Button, Col, Empty, Form, Input, Row, Select, Space, Spin} from 'antd';
import {useRequest} from '@/utils/useRequest';
import {useEffect, useMemo, useState} from 'react';
import debounce from 'lodash.debounce';
import {handleCreateAntdZodValidator} from '@/utils/helpers';
import {NewUserZod} from '@/app/dashboard/users/schema/new-user';
import {DeleteOutlined} from '@ant-design/icons';
import {useQueryClient} from '@tanstack/react-query';
import starkString from 'starkstring';

const SaveUserForm = ({handleCloseModal, editUserId, editUserData, setUserToken, handleOpenTokenModal}) => {
  const [formRef] = Form.useForm();
  const request = useRequest();
  const queryClient = useQueryClient();
  
  const nationalCodeWatch = Form.useWatch('nationalCode', formRef);
  const mobileNumberWatch = Form.useWatch('mobileNumber', formRef);
  
  const [searchProducts, setSearchProducts] = useState('');
  
  const {
    data: searchedProductsData,
    isLoading: searchedProductsIsLoading
  } = request.useQuery({
    url: '/api/v1/product',
    params: {
      pageNumber: 1,
      search: searchProducts
    },
    queryKey: ['products', {pageNumber: 1, search: searchProducts}]
  });
  
  const searchedProducts = searchedProductsData?.response?.products || [];
  
  const debounceFetcher = useMemo(() => debounce(setSearchProducts, 500), []);
  
  const handleDeleteProduct = productId => {
    const selectedProducts = formRef.getFieldValue('selectedProducts');
    formRef.setFieldValue('selectedProducts', selectedProducts?.filter(item => item?.value !== productId));
  };
  
  const {isPending: createCustomerIsLoading, mutateAsync: createCustomerRequest} = request.useMutation({
    url: '/api/v1/customer',
    mutationKey: ['createCustomer']
  });
  
  const {isPending: updateCustomerIsLoading, mutateAsync: updateCustomerRequest} = request.useMutation({
    url: `/api/v1/customer/${editUserId}`,
    method: 'patch',
    mutationKey: ['updateCustomer']
  });
  
  const handleOnFinishForm = async () => {
    try {
      await formRef.validateFields();
      
      const values = formRef.getFieldsValue(true);
      
      values.products = values?.selectedProducts?.map(item => item?.value);
      
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
      const selectedProductsError = error?.errorFields?.find(item => item?.name[0] === 'selectedProducts');
      
      if (selectedProductsError?.errors) {
        formRef.setFields([
          {
            name: 'search',
            errors: selectedProductsError?.errors
          }
        ]);
      }
    }
  };
  
  useEffect(() => {
    if (editUserId?.length) {
      const {products, ...rest} = editUserData;
      formRef.setFieldsValue({
        ...rest,
        selectedProducts: products?.map(item => ({label: item?.name, value: item?._id}))
      });
    }
  }, [editUserId]);
  
  useEffect(() => {
    formRef.setFields([
      {
        name: 'nationalCode',
        value: starkString(nationalCodeWatch).englishNumber().parseNumber().toString(),
        errors: []
      }
    ]);
  }, [nationalCodeWatch]);
  
  useEffect(() => {
    formRef.setFields([
      {
        name: 'mobileNumber',
        value: starkString(mobileNumberWatch).englishNumber().parseNumber().toString(),
        errors: []
      }
    ]);
  }, [mobileNumberWatch]);
  
  return (
    <Spin spinning={createCustomerIsLoading || updateCustomerIsLoading}>
      <Form
        layout="vertical"
        form={formRef}
      >
        <Form.Item
          name={'selectedProducts'}
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
                loading={searchedProductsIsLoading}
                placeholder={'جستجو درسنامه...'}
                showSearch
                filterOption={false}
                notFoundContent={searchedProductsIsLoading ?
                  <Empty description={<Spin size="small" />} /> :
                  <Empty />}
                onSearch={debounceFetcher}
                options={searchedProducts?.map(searchedProduct => {
                  return {
                    label: searchedProduct?.name,
                    value: searchedProduct?._id
                  };
                })}
                onSelect={(selectedProductId, option) => {
                  const oldData = formRef.getFieldValue('selectedProducts') || [];
                  
                  formRef.setFields([
                    {
                      name: 'selectedProducts',
                      value: oldData.find(item => item?.value === selectedProductId) ? oldData : [...oldData, option]
                    }
                  ]);
                  
                  formRef.setFieldValue('search', null);
                }}
              />
            </Form.Item>
          </Col>
          
          <Col span={24} className="mt-8">
            <Form.Item
              shouldUpdate={(prevValues, curValues) => prevValues?.selectedProducts !== curValues?.selectedProducts}
              noStyle
            >
              {({getFieldValue}) => {
                const selectedProducts = getFieldValue('selectedProducts') || [];
                
                return (
                  <Row className="text-gray-70 !text-captionMd [&>div]:px-16 [&>div]:h-[56px] [&>div]:leading-[56px] --newUserSelectedCourse">
                    {selectedProducts?.map(product => (
                      <Col span={24} key={product?.value}>
                        <Row align="middle" justify="space-between">
                          <Col>
                            <span className="--listDot"></span>
                            {product?.label}
                          </Col>
                          
                          <Col>
                            <DeleteOutlined
                              className="!text-red-600 cursor-pointer"
                              onClick={() => handleDeleteProduct(product?.value)}
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
