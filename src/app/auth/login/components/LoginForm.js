'use client';

import {TransitionsComponent} from '@/templates/UI';
import {LoginZod} from '@/app/auth/login/schema/login';
import {Button, Form, Input} from 'antd';
import {FC, useEffect} from 'react';
import {useHandleLogin} from '@/app/auth/login/utils/useHandleLogin';
import {handleCreateAntdZodValidator} from '@/utils/helpers';
import {useRequest} from '@/utils/useRequest';
import {useAuth} from '@/app/context/auth/AuthContext';
import {useRouter} from 'next/navigation';

const LoginForm = () => {
  const [formRef] = Form.useForm();
  const {handleChangeUserData} = useAuth();
  const router = useRouter();
  const request = useRequest();
  
  const nationalCodeWatch = Form.useWatch('nationalCode', formRef);
  
/*
  useEffect(() => {
    formRef.setFields([
      {
        name: 'nationalCode',
        value: nationalCodeWatch?.replace(/\D/g, ''),
        errors: []
      }
    ]);
  }, [nationalCodeWatch]);
*/
  
  const {mutateAsync: loginRequest} = request.useMutation({
    url: '/api/v1/auth/login',
    mutationKey: ['auth', 'signIn']
  });
  
  const handleOnFinishLogin = async (formData) => {
    try {
      const loginZod = LoginZod.parse(formData);
      
      const loginResponse = await loginRequest(loginZod);
      
      await handleChangeUserData(loginResponse?.response);
      
      if (loginResponse.response?.user?.type === 'admin') {
        router.push('/dashboard/users');
      }
    } catch (error) {
      console.log('error in handleOnFinishLogin >>>', error);
    }
  };
  
  return (
    <Form
      form={formRef}
      onFinish={handleOnFinishLogin}
    >
      <TransitionsComponent>
        <TransitionsComponent.Motion id={'loginPage'}>
          <Form.Item
            name={'nationalCode'}
            rules={[handleCreateAntdZodValidator(LoginZod)]}
          >
            <Input placeholder={'کد ملی'} />
          </Form.Item>
          
          <Form.Item
            name={'password'}
            rules={[handleCreateAntdZodValidator(LoginZod)]}
          >
            <Input.Password placeholder={'رمز عبور'} />
          </Form.Item>
        </TransitionsComponent.Motion>
      </TransitionsComponent>
      
      <Button
        type="primary"
        block
        htmlType="submit"
        className="mt-[30px]"
      >
        ورود
      </Button>
    </Form>
  );
};

export default LoginForm;
