import {CollaborationOutlined, ReceiptTextOutlined, UsersOutlined} from '@/templates/icons';

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
    link: '/dashboard/products'
  },
  {
    key: 'categories',
    label: 'دسته بندی ها',
    icon: <CollaborationOutlined className="!text-[25px]" />,
    link: ''
  }
];
