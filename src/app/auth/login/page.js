import {Divider} from 'antd';
import Form from '@/app/auth/login/components/form';
import Spin from '@/app/auth/login/components/spin';

const Login = () => {
  return (
    <Spin>
      <div className="space-y-24">
        <div>
          <Divider
            orientation="left"
            rootClassName="!mb-40 !mt-0 [&>span]:!text-h7 [&>span]:!text-primary-0"
          >
            ورود
          </Divider>
          
          <div className="text-bodySm text-primary-shade-8">
            برای ورود کد ملی و رمز عبور خود را وارد کنید.
          </div>
        </div>
        
        <div>
          <Form />
        </div>
      </div>
    </Spin>
  );
};

export default Login;
