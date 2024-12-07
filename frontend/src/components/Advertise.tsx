import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { BASE_API_URL } from '@/utils/constant';

export function AdvertiseComponent() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <Card className="bg-white shadow-lg border-1 border-gray-200">
            <CardContent className="h-[400px] p-0">
              <img src={`${BASE_API_URL}/banner.jpg`} className="w-full h-full object-cover" />
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="bg-white shadow-lg border-1 border-gray-200">
            <CardContent className="h-[400px] p-0">
              <img src={`${BASE_API_URL}/banner.jpg`} className="w-full h-full object-cover" />
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card className="bg-white shadow-lg border-1 border-gray-200">
            <CardContent className="h-[400px] p-0">
              <img src={`${BASE_API_URL}/banner.jpg`} className="w-full h-full object-cover" />
            </CardContent>
          </Card>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
