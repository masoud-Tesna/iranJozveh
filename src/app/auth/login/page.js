import {Divider} from 'antd';
import LoginForm from '@/app/auth/login/components/LoginForm';
import Spin from '@/app/auth/login/components/Spin';

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
          <LoginForm />
        </div>
      </div>
    </Spin>
  );
};

export default Login;
