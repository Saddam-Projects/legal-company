import Image from 'next/image';
import useNavigateTo from '@/hooks/useNavigateTo';
import { BASE_API_URL } from '@/utils/constant';
import { convertToCurrency } from '@/lib/utils';
import { FORM_URL } from '@/datasources/internals/menus';
import { CheckCircle2 } from 'lucide-react';
import { Service } from '@/entity/service';
import TextComponent from '../Text';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';

export default function ServiceCardShimmersComponent(): JSX.Element {
  return (
    <Card className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
      <CardContent className="h-full py-8">
        <div className="flex flex-col items-center justify-between h-full">
          <div className="flex flex-col w-full items-center space-y-2">
            <div className="bg-gray-400 w-full h-8 rounded-md animate-pulse"></div>
            <div className="bg-gray-400 w-full lg:w-1/2 h-28 rounded-lg animate-pulse"></div>
          </div>
          <div className="py-4 w-full flex justify-center">
            <div className="bg-gray-400 w-full lg:w-1/4 h-6 rounded-md animate-pulse"></div>
          </div>
          <div className="flex flex-col space-y-2 mb-4 w-full lg:w-3/4">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className="flex space-x-2 items-center">
                <div className="bg-gray-400 w-12 h-8 rounded-md animate-pulse"></div>
                <div className="bg-gray-400 w-full h-8 rounded-md animate-pulse"></div>
              </div>
            ))}
          </div>
          <div className="w-full lg:w-1/2">
            <Button disabled size={'sm'} className="bg-gray-400 w-full hover:bg-gray-400 animate-pulse"></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
