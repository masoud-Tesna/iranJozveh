'use client';

import {useSelectedLayoutSegments} from 'next/navigation';
import {Menu} from 'antd';
import {findMenuItemsByLink, menuItems} from '@/app/dashboard/utils/menu-items';
import Link from 'next/link';

const SidebarMenu = () => {
  const segment = useSelectedLayoutSegments();
  
  segment.unshift('/dashboard');
  
  // segment[0] = '/dashboard';
  
  
  const findCurrentMenuItem = findMenuItemsByLink(menuItems, segment?.join('/'));
  
  console.log(findCurrentMenuItem);
  
  const items = menuItems?.map(item => {
    const children = item?.children;
    return (
      {
        key: item?.key,
        icon: item?.icon,
        label: item?.link ? <Link href={item?.link}>{item?.label}</Link> : item?.label,
        children: children?.length ? children?.map(child => ({
          key: child?.key,
          label: child?.link ?
            <Link href={child?.link}>{child?.label}</Link> :
            child?.label
        })) : null
      }
    );
  });
  
  return (
    <Menu
      items={items}
      theme="light"
      className="max-h-[calc(100%-140px)] overflow-y-auto"
      mode="inline"
      selectedKeys={findCurrentMenuItem?.length ?
        findCurrentMenuItem.map(item => item?.key) :
        ['dashboard']}
      defaultOpenKeys={(findCurrentMenuItem?.length) ?
        findCurrentMenuItem.map(item => item?.key) :
        []}
    />
  );
};

export default SidebarMenu;
