import './globals.css';
import 'react-loading-skeleton/dist/skeleton.css';
import CombineProvider from '@/app/CombineProvider';

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
        {children}
      </CombineProvider>
    </div>
    </body>
    </html>
  );
};

export default RootLayout;
