'use client';

// import Banner from './Banner';
import BannerCTA from './BannerCTA';
import classNames from 'classnames';
import { Layout } from 'antd';
import { useSelectedLayoutSegment } from 'next/navigation';
import dynamic from 'next/dynamic';
import Skeleton from 'react-loading-skeleton';

const Banner = dynamic(
  () => import('./Banner'),
  {
    ssr: false,
    loading: () => <Skeleton height={ 297 } width={ '100%' } />
  }
);

const Content = ({ children }) => {
  const segment = useSelectedLayoutSegment();
  
  return (
    <Layout.Content>
      <div className="--bannerSection relative hidden md:block">
        <div>
          <Banner />
        </div>
        
        <div className="w-full lg:w-10/12 mx-auto relative top-[-25px]">
          <BannerCTA />
        </div>
      </div>
      
      <div className="--mobileBannerSection relative md:!hidden">
        <Banner asMobile />
      </div>
      
      <div
        className={ classNames(
          'w-full mx-auto relative md:hidden p-[16px] pb-0',
          { '!hidden': segment === 'projects' }
        ) }
      >
        <BannerCTA />
      </div>
      
      <div className="--pageSection md:mt-[40px] text-black w-full md:w-10/12 mx-auto">
        { children }
      </div>
    </Layout.Content>
  );
};

export default Content;
