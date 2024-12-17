import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { BASE_API_URL } from '@/utils/constant';
import { Banner } from '@/entity/Banner';

export function AdvertiseComponent({ banners }: { banners: Banner[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {banners.map((item, index) => (
          <CarouselItem key={index} className="lg:basis-1/2">
            <div className="w-full h-[400px]">
              <img src={`${BASE_API_URL}/${item.image}`} className="w-full h-full object-cover" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
