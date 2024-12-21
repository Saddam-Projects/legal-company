import { BackpackIcon, CardStackIcon, CardStackPlusIcon, CubeIcon, ExitIcon, FileIcon, GearIcon, HomeIcon, StackIcon, TextIcon } from '@radix-ui/react-icons';
import { BANNER_URL, BLOG_URL, CLIENT_URL, CUSTOMER_URL, DASHBOARD_URL, GALLERY_URL, ORDER_URL, SERVICE_URL, SETTINGS_URL } from './menus';
import { INavbarMenu } from '@/interfaces/components/MenuInterface';
import permission from './permission';

const navbarMenus: INavbarMenu[] = [
  {
    to: DASHBOARD_URL,
    title: 'dashboard',
    icon: HomeIcon,
  },
  {
    to: CUSTOMER_URL,
    title: 'customer',
    icon: CardStackIcon,
  },
  {
    to: SERVICE_URL,
    title: 'Layanan',
    icon: BackpackIcon,
  },
  {
    to: ORDER_URL,
    title: 'Order',
    icon: StackIcon,
  },
  {
    to: GALLERY_URL,
    title: 'Gallery',
    icon: FileIcon,
  },
  {
    to: BANNER_URL,
    title: 'Banner Promo',
    icon: CubeIcon,
  },

  {
    to: CLIENT_URL,
    title: 'Client',
    icon: CardStackPlusIcon,
  },
  {
    to: BLOG_URL,
    title: 'Blog',
    icon: TextIcon,
  },
  {
    to: SETTINGS_URL,
    title: 'settings',
    icon: GearIcon,
  },
];

export default navbarMenus;
