import Image from 'next/image';
import TextComponent from './Text';
import { CardContent, Card } from './ui/card';
import { Button } from './ui/button';
import useNavigateTo from '@/hooks/useNavigateTo';
import { BASE_API_URL } from '@/utils/constant';
import { convertToCurrency } from '@/lib/utils';
import { FORM_URL } from '@/datasources/internals/menus';
import { CheckCircle2 } from 'lucide-react';
import { Service } from '@/entity/service';

export default function ServiceCardComponent({ item, index }: { item: Service; index: number }): JSX.Element {
  const navigateTo = useNavigateTo();

  return (
    <Card key={index} className="bg-white shadow-none border-1 border-gray-200 rounded-md w-full h-full">
      <CardContent className="h-full py-8">
        <div className="flex flex-col items-center justify-between h-full">
          <div className="flex flex-col items-center space-y-8">
            <TextComponent className="text-black font-bold text-lg uppercase text-center">{item.name}</TextComponent>
            <Image objectFit="cover" quality={100} src={`${BASE_API_URL}/${item.image}`} width={120} height={120} alt="Page Not Found" priority />
          </div>
          <div className="py-4">
            <TextComponent className="text-base font-bold text-teal">{item.price > 0 ? convertToCurrency(item.price) : 'Hubungi Langsung'}</TextComponent>
          </div>
          <div className="flex flex-col space-y-2 mb-4">
            {item.service_terms.map((e, index) => (
              <div key={index} className="flex space-x-2 items-center">
                <CheckCircle2 className="text-secondary w-4" />
                <TextComponent className="text-base font-regular capitalize text-teal">{e.term_name}</TextComponent>
              </div>
            ))}
          </div>
          <div>
            <Button onClick={() => navigateTo(FORM_URL, `service-id=${item.id}`)} size={'sm'} className="bg-primary text-black hover:bg-primary hover:opacity-90 mx-auto">
              Minta Proposal
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
