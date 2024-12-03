'use client';

import { AreaChartComponent } from '@/components/AreaChart';
import BarChartComponent from '@/components/BarChart';
import MapComponent from '@/components/Map';
import PieChartComponent from '@/components/PieChart';
import { DataTableDemo } from '@/components/Table';
import TextComponent from '@/components/Text';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { CalendarIcon, CaretDownIcon } from '@radix-ui/react-icons';
import 'leaflet/dist/leaflet.css';

export default function Page() {
  return (
    <>
      <div className="h-[250px] bg-teal">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="h-full">
            <TextComponent>Dashboard</TextComponent>
          </div>
          <div>
            <TextComponent>Dashboard</TextComponent>
          </div>
        </div>
      </div>
      <div className="h-[500px] bg-white">
        <TextComponent>Dashboard</TextComponent>
      </div>
      <div className="py-12 bg-gold">
        <TextComponent>Dashboard</TextComponent>
      </div>
      <div className="h-[300px] bg-white">
        <TextComponent>Dashboard</TextComponent>
      </div>
    </>
  );
}
