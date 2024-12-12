import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { BASE_API_URL } from '@/utils/constant';

export function AdvertiseComponent() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="lg:basis-1/2">
          <div className="w-full h-[400px]">
            <img src={`${BASE_API_URL}/banner.jpg`} className="w-full h-full object-cover" />
          </div>
        </CarouselItem>
        <CarouselItem className="lg:basis-1/2">
          <div className="w-full h-[400px]">
            <img src={`${BASE_API_URL}/banner.jpg`} className="w-full h-full object-cover" />
          </div>
        </CarouselItem>
        <CarouselItem className="lg:basis-1/2">
          <div className="w-full h-[400px]">
            <img src={`${BASE_API_URL}/banner.jpg`} className="w-full h-full object-cover" />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
