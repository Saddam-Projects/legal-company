'use client';

import { CustomerTable } from '@/components/customer/table';
import MapComponent from '@/components/Map';
import TextComponent from '@/components/Text';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Statistic } from '@/entity/Statistic';
import referenceService from '@/services/refernce.service';
import dashboardService from '@/services/statistic.service';

import 'leaflet/dist/leaflet.css';
import { LetterTextIcon, ReceiptIcon, UserIcon } from 'lucide-react';

export default function Page() {
  const statisticService = dashboardService.getStatistic();
  const reference = referenceService.getReference();

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
                  <div className={`w-16 h-16 rounded-xl flex justify-center items-center border-dark dark:border-light border-2`}>
                    {i === 0 && <UserIcon size={32} />}
                    {i === 1 && <ReceiptIcon size={32} />}
                    {i === 2 && <LetterTextIcon size={32} />}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {reference.reference && (
        <div>
          <Card>
            <CardHeader>Company Location</CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 h-[400px]">
                <MapComponent name={reference.reference.company_name} lat={reference.reference.address_lat as unknown as number} long={reference.reference.address_long as unknown as number} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="grid grid-cols-1">
        <CustomerTable />
      </div>
    </div>
  );
}
