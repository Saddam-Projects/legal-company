import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { BASE_API_URL } from '@/utils/constant';
import { ClientLogo } from '@/entity/ClientLogo';

export function ClientComponent({ clients }: { clients: ClientLogo[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {clients.map((item, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/6">
            <img src={`${BASE_API_URL}/${item.image}`} className="w-[180px] h-[180px] object-contain" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
