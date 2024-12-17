import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { BASE_API_URL } from '@/utils/constant';
import { Gallery } from '@/entity/Gallery';

export function GalleryComponent({ galleries }: { galleries: Gallery[] }) {
  return (
    <Carousel>
      <CarouselContent>
        {galleries.map((gallery, index) => (
          <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
            <img src={`${BASE_API_URL}/${gallery.image}`} className="w-full h-full object-cover" />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
