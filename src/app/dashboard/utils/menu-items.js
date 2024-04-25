import {AndroidOutlined, ReceiptTextOutlined, UsersOutlined} from '@/templates/icons';

export const menuItems = [
  {
    key: 'users',
    label: 'کاربران',
    icon: <UsersOutlined className="!text-[25px]" />,
    link: '/dashboard/users'
  },
  {
    key: 'products',
    label: ' محصولات',
    icon: <ReceiptTextOutlined className="!text-[25px]" />,
    link: '',
    children: [
      {
        key: 'textbook',
        label: 'درسنامه',
        link: '/dashboard/products/textbook'
      },
      {
        key: 'course',
        label: 'دوره آموزشی',
        link: '/dashboard/products/course'
      }
    ]
  },
  {
    key: 'android-version-control',
    label: 'مدیریت ورژن اپلیکیشن',
    icon: <AndroidOutlined className="!text-[25px]" />,
    link: '/dashboard/android-version-control'
  }
];

function trimStringAfterEdit(link) {
  const indexAfterEdit = link.indexOf('/edit/') + '/edit'.length;
  
  return link.substring(0, indexAfterEdit);
}

export function findMenuItemByLink(menuItems, link) {
  let editedLink = link.includes('/edit/') ? trimStringAfterEdit(link) : link;
  
  editedLink = editedLink?.replace(/\/\([^)]+\)/, '');
  
  const foundMenuItem = menuItems.find(item => item.link === editedLink);
  
  if (foundMenuItem) {
    return foundMenuItem;
  }
  
  for (const menuItem of menuItems) {
    if (menuItem.children) {
      const found = findMenuItemByLink(menuItem?.children, link);
      
      if (found) {
        return found;
      }
    }
    else if (menuItem.breadCrumbItems) {
      const found = findMenuItemByLink(menuItem?.breadCrumbItems, editedLink);
      if (found) {
        return found;
      }
    }
  }
  
  return null;
}

function find(t, func) {
  let result = [];
  
  for (const node of t) {
    if (func(node)) {
      result.push([node]);
    }
    
    if (node.children) {
      const childResult = find(node?.children, func);
      if (childResult?.length > 0) {
        result?.push([node, ...childResult[0]]);
      }
    }
    else if (node.breadCrumbItems) {
      const childResult = find(node?.breadCrumbItems, func);
      if (childResult?.length > 0) {
        result?.push([node, ...childResult[0]]);
      }
    }
  }
  
  return result;
}

export function findMenuItemsByLink(t, link) {
  let editedLink = link.includes('/edit/') ? trimStringAfterEdit(link) : link;
  editedLink = editedLink?.replace(/\/\([^)]+\)/, '');
  
  const result = find(t, (node) => node?.link === editedLink);
  return result?.length > 0 ? result[0] : [];
}
