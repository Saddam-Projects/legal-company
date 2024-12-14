'use client';

import { CustomerTable } from '@/components/customer/table';
import MapComponent from '@/components/Map';
import TextComponent from '@/components/Text';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Statistic } from '@/entity/Statistic';
import dashboardService from '@/services/statistic.service';

import 'leaflet/dist/leaflet.css';

export default function Page() {
  const statisticService = dashboardService.getStatistic();

  return (
    <div className="grid grid-cols-1 gap-4">
      {statisticService.statistic && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(statisticService.statistic).map((e, i) => (
            <Card key={i} className="h-40">
              <CardContent className="h-full p-0">
                <div className="flex justify-between items-center h-full p-6">
                  <div className="flex flex-col justify-between space-y-2">
                    <TextComponent className="text-base capitalize font-normal">{e.replace('_', ' ')}</TextComponent>
                    <TextComponent className="text-lg font-bold">{statisticService.statistic![e as keyof Statistic]}</TextComponent>
                  </div>
                  <div className={`w-24 h-24 rounded-sm border-4 ${i % 2 === 0 ? 'border-blue-hris' : 'border-red-500'} flex justify-center items-center`}></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

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
        <CustomerTable />
      </div>
    </div>
  );
}
