import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { BASE_API_URL } from '@/utils/constant';

export function ClientComponent() {
  return (
    <Carousel>
      <CarouselContent>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <CarouselItem key={item} className="basis-1/2 lg:basis-1/6">
            <img src={`${BASE_API_URL}/banner.jpg`} className="w-[180px] h-[180px] object-contain" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
