'use client';

import Image from 'next/image';
import {useSelectedLayoutSegment} from 'next/navigation';

import homeBanner from '/public/images/homeBanner.png';
import projectsBanner from '/public/images/projects/projectsPageBanner.png';
import projectsPageBannerXs from '/public/images/projects/projectsPageBannerXs.png';
import {useWindowSize} from '@/utils/helpers';


// const passiveEventListener = {passive: true};

/*const FixParallaxScrollEvent = () => {
 const parallaxController = useParallaxController();
 
 useEffect(() => {
 if (parallaxController) {
 const updateParallaxController = () => parallaxController.update();
 
 window.addEventListener('scroll', updateParallaxController, passiveEventListener);
 
 return () => {
 window.removeEventListener('scroll', updateParallaxController, passiveEventListener);
 };
 }
 }, [parallaxController]);
 
 return null;
 };*/

const Banner = ({asMobile}) => {
  const segment = useSelectedLayoutSegment();
  
  const {width} = useWindowSize();
  
  const bannersSettings = {
    home: {
      banner: homeBanner,
      alt: 'Hirad',
      height: 'calc(100vh - 75px - 72px)',
      objectFit: 'cover',
      rest: {}
    },
    projects: {
      banner: width <= 767 ? projectsPageBannerXs : projectsBanner,
      alt: 'projectName',
      height: 297,
      rest: {
        className: 'max-md:object-cover max-md:object-left'
      }
    }
  };
  
  const activeBannerSetting = bannersSettings[segment || 'home'];
  
  return (
    <div style={{height: asMobile ? 150 : activeBannerSetting?.height}}>
      <Image
        src={activeBannerSetting?.banner}
        alt={activeBannerSetting?.alt}
        layout={'fill'}
        style={{maxHeight: activeBannerSetting?.height}}
        {...activeBannerSetting.rest}
      />
    </div>
  );
  
  
  /*return (
   <ParallaxProvider>
   {/!*<FixParallaxScrollEvent />*!/}
   
   <ParallaxBanner
   layers={[
   {image: '/images/banner-background.jpg', speed: -30, className: 'aspect-[2/1]-'},
   {
   speed: -40,
   children: (
   <div className="absolute inset-0 top-[-10%] flex items-center justify-center">
   <h1 className="text-8xl text-white font-thin">هیراد</h1>
   </div>
   )
   },
   {image: '/images/banner-foreground.png', speed: -20, className: 'aspect-[2/1]-'}
   ]}
   className="h-full"
   />
   </ParallaxProvider>
   );*/
};

export default Banner;
