'use client';

import {useSelectedLayoutSegments} from 'next/navigation';
import {Menu} from 'antd';
import {menuItems} from '@/app/dashboard/utils/menuItems';
import Link from 'next/link';

const SidebarMenu = () => {
    const segment = useSelectedLayoutSegments();

    const items = menuItems?.map(item => (
        {
            key: item?.key,
            icon: item?.icon,
            label: item?.link ? <Link href={item?.link}>{item?.label}</Link> : item?.label
        }
    ));

    return (
        <Menu
            items={items}
            theme="light"
            className="max-h-[calc(100%-140px)] overflow-y-auto"
            mode="inline"
            selectedKeys={segment?.length ? segment : ['dashboard']}
        />
    );
};

export default SidebarMenu;
