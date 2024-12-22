import { BackpackIcon, CardStackIcon, HomeIcon, LayersIcon, TextIcon } from '@radix-ui/react-icons';
import { ABOUT_US_URL, BLOG_URL, CONTACT_US_URL, DASHBOARD_URL, SERVICES_URL } from './menus';
import { INavbarMenu } from '@/interfaces/components/MenuInterface';

const navbarMenus: INavbarMenu[] = [
  {
    to: DASHBOARD_URL,
    title: 'Home',
    icon: HomeIcon,
  },
  {
    to: ABOUT_US_URL,
    title: 'About Us',
    icon: LayersIcon,
  },
  {
    to: CONTACT_US_URL,
    title: 'Contact Us',
    icon: CardStackIcon,
  },
  {
    to: SERVICES_URL,
    title: 'Services',
    icon: BackpackIcon,
  },
  {
    to: BLOG_URL,
    title: 'Blog',
    icon: TextIcon,
  },
];

export default navbarMenus;
