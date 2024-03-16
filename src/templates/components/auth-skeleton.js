'use client';

import {Col, Row, Skeleton} from 'antd';

export const AuthSkeleton = ({justInputs = false, layout = false}) => {
  if (layout) {
    return (
      <Row
        className="h-full"
        align={'stretch'}
      >
        <Col span={12}>
          <Row gutter={[0, 32]}>
            <Col
              span={24}
              className="text-center pt-[65px]"
            >
              <Skeleton.Input
                active
                rootClassName="!w-81px"
                className="!h-[65px]"
              />
            </Col>
            
            <Col
              span={24}
              className="pb-[15px] px-[4%] md:px-[5.5%] lg:px-[6.5%]"
            >
              <div className="mt-[24px] space-y-[38px]">
                <div>
                  <Skeleton.Input
                    active
                    block
                    className="!h-[42px]"
                  />
                </div>
                
                <div>
                  <Skeleton.Input
                    active
                    block
                    className="!h-[42px]"
                  />
                </div>
                
                <div>
                  <Skeleton.Input
                    active
                    block
                    className="!h-[42px] mt-[20px]"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        
        <Col span={12}>
          <div className="!h-full">
            <Skeleton.Input
              active
              block
              className="!h-full"
            />
          </div>
        </Col>
      </Row>
    );
  }
  
  return (
    <>
      {!justInputs &&
        <>
          <div>
            <Skeleton.Input
              active
              rootClassName="!w-[25%]"
              className="!w-full !min-w-[auto] !h-[25px]"
            />
          </div>
          
          <div className="mt-2">
            <Skeleton.Input
              active
              rootClassName="!w-[50%]"
              className="!w-full !min-w-[auto] !h-[20px]"
            />
          </div>
        </>
      }
      
      <div className="mt-[24px] space-y-[38px]">
        <div>
          <Skeleton.Input
            active
            block
            className="!h-[42px]"
          />
        </div>
        
        <div>
          <Skeleton.Input
            active
            block
            className="!h-[42px]"
          />
        </div>
        
        <div>
          <Skeleton.Input
            active
            block
            className="!h-[42px] mt-[20px]"
          />
        </div>
      </div>
      
      {!justInputs &&
        <>
          <div className="mt-6">
            <Skeleton.Input
              active
              rootClassName="!w-[40%]"
              className="!w-full !min-w-[auto] !h-[23px]"
            />
          </div>
          
          <div className="mt-2">
            <Skeleton.Input
              active
              rootClassName="!w-[30%]"
              className="!w-full !min-w-[auto] !h-[23px]"
            />
          </div>
        </>
      }
    </>
  );
};
