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
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="h-40">
            <CardContent className="h-full p-0">
              <div className="flex justify-between items-center h-full p-6">
                <div className="flex flex-col justify-between space-y-2">
                  <TextComponent className="text-base font-normal">Total Employee</TextComponent>
                  <TextComponent className="text-lg font-bold">5267</TextComponent>
                  <TextComponent className="text-base font-medium">Per Month</TextComponent>
                </div>
                <div className={`w-24 h-24 rounded-full border-4 ${i % 2 === 0 ? 'border-blue-hris' : 'border-red-500'} flex justify-center items-center`}>
                  <TextComponent className="text-xl font-bold">72%</TextComponent>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <Card>
          <CardHeader>Company Location</CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-1 h-[400px]">
              <MapComponent />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1">
        <DataTableDemo />
      </div>
    </div>
  );
}
