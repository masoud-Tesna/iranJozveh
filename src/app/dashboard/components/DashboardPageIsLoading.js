'use client';

import {Col, Row, Skeleton} from 'antd';

const DashboardPageIsLoading = () => {
    return (
        <>
            <Skeleton.Button block className="!h-[122px]"/>

            <div className="mt-[27px] px-[3%] h-[calc(100%-253px)]">
                <Row gutter={11} justify="space-between">
                    <Col span={6}>
                        <Row gutter={11}>
                            <Col span={12}>
                                <Skeleton.Button block className="!h-[44px]"/>
                            </Col>

                            <Col span={12}>
                                <Skeleton.Button block className="!h-[44px]"/>
                            </Col>
                        </Row>
                    </Col>

                    <Col span={18}>
                        <Skeleton.Button block className="!h-[44px]"/>
                    </Col>
                </Row>

                <div className="mt-[60px] h-full">
                    <Skeleton.Button block className="!h-full"/>
                </div>
            </div>
        </>
    );
};

export default DashboardPageIsLoading;
