import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { BASE_API_URL } from '@/utils/constant';

export function GalleryComponent() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem className="basis-1 lg:basis-1/3">
          <img src={`${BASE_API_URL}/banner.jpg`} className="w-full h-full object-cover" />
        </CarouselItem>
        <CarouselItem className="basis-1 lg:basis-1/3">
          <img src={`${BASE_API_URL}/banner.jpg`} className="w-full h-full object-cover" />
        </CarouselItem>
        <CarouselItem className="basis-1 lg:basis-1/3">
          <img src={`${BASE_API_URL}/banner.jpg`} className="w-full h-full object-cover" />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
