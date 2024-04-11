'use client';

import {TransitionsComponent} from '@/templates/UI';
import {LoginZod} from '@/app/auth/login/schema/login';
import {Button, Form as AntdForm, Input} from 'antd';
import {handleCreateAntdZodValidator} from '@/utils/helpers';
import {useRequest} from '@/utils/useRequest';
import {useAuth} from '@/app/context/auth/auth-context';
import {useRouter} from 'next/navigation';

const Form = () => {
  const [formRef] = AntdForm.useForm();
  const {handleChangeUserData} = useAuth();
  const router = useRouter();
  const request = useRequest();
  
  const nationalCodeWatch = AntdForm.useWatch('nationalCode', formRef);
  
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
    url: '/v1/auth/login',
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
    <AntdForm
      form={formRef}
      onFinish={handleOnFinishLogin}
    >
      <TransitionsComponent>
        <TransitionsComponent.Motion id={'loginPage'}>
          <AntdForm.Item
            name={'nationalCode'}
            rules={[handleCreateAntdZodValidator(LoginZod)]}
          >
            <Input placeholder={'کد ملی'} />
          </AntdForm.Item>
          
          <AntdForm.Item
            name={'password'}
            rules={[handleCreateAntdZodValidator(LoginZod)]}
          >
            <Input.Password placeholder={'رمز عبور'} />
          </AntdForm.Item>
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
    </AntdForm>
  );
};

export default Form;
