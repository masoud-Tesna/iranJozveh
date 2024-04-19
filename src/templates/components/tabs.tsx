import {Col, Row} from 'antd';
import classNames from 'classnames';
import {RefObject, useEffect, useRef, useState} from 'react';
import {TTabs} from './types/tabs';

const Tabs = ({ items, current, onChange, className }: TTabs) => {
    const tabsRef: RefObject<HTMLDivElement[]> = useRef([]);

    const filteredItems = items?.filter(item => !item?.hidden) || [];

    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

    useEffect(() => {
        function setTabPosition() {
            const currentTab = tabsRef?.current?.[current];
            setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
            setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
        }

        setTabPosition();

        window.addEventListener('resize', setTabPosition);

        return () => window.removeEventListener('resize', setTabPosition);
    });

    return (
        <Row className={ classNames('--tabs --line relative py-8', className) } align="middle">
            { filteredItems?.map((item, index) => (
                <Col
                    ref={ (el: any) => (tabsRef.current![item?.tabIndex] = el) }
                    key={ `tabItem_${ item?.key }` }
                    className={ classNames(
                        '--tabItem',
                        { '--active': item?.tabIndex == current }
                    ) }
                    onClick={ () => onChange ? onChange(item?.tabIndex) : null }
                >
                    { item?.title }
                </Col>
            )) }
            <span
                className="absolute -bottom-px block rounded-full h-[2px] bg-[#6251DD] transition-all duration-300"
                style={ { left: tabUnderlineLeft, width: tabUnderlineWidth } }
            />
        </Row>
    );
};

export default Tabs;
