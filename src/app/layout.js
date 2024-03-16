import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import CombineProvider from '@/app/combine-provider';
import AntdLayout from '@/app/components/antd-layout';

export const metadata = {
  title: 'new APP',
  description: 'New App'
};

const RootLayout = ({children}) => {
  return (
    <html lang="fa">
    <body className={'!font-samim'}>
    <div className="--hiradApp h-full">
      <CombineProvider>
        <AntdLayout>
          {children}
        </AntdLayout>
      </CombineProvider>
    </div>
    </body>
    </html>
  );
};

export default RootLayout;
