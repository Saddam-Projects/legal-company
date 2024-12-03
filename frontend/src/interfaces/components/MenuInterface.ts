import { IconProps } from '@radix-ui/react-icons/dist/types';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export interface INavbarMenu {
  to: string;
  title: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
  childrens?: INavbarMenu[];
  resourceName?: string;
}
