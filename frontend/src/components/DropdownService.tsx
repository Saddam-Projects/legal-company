import serviceService from '@/services/service';
import TextComponent from './Text';
import { Card, CardContent } from './ui/card';
import { FaBuilding, FaRegBuilding } from 'react-icons/fa';
import useNavigateTo from '@/hooks/useNavigateTo';
import { SERVICES_URL } from '@/datasources/internals/menus';

export default function DropdownService({ closeDropdownService }: { closeDropdownService: () => void }) {
  const service = serviceService.getData(10, 0, undefined, 'new');
  const navigateTo = useNavigateTo();
  return (
    <div className="fixed bottom-0 h-4/5 w-full p-4 bg-white" onMouseLeave={closeDropdownService}>
      <div className="flex flex-col items-center h-full w-full">
        <TextComponent className="text-2xl font-medium capitalize text-teal">Layanan Kami</TextComponent>
        <div className="h-[1px] bg-gray-200 w-full my-4"></div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full overflow-y-auto">
          {service.services.map((item, index) => (
            <Card key={index} className="w-full h-full bg-transparent border-none shadow-none cursor-pointer hover:opacity-80">
              <CardContent className="py-4 w-full">
                <div className="flex space-x-4 items-center">
                  {index % 2 === 0 ? <FaBuilding className="text-teal" size={40} /> : <FaRegBuilding className="text-teal" size={40} />}
                  <TextComponent
                    onClick={() => {
                      navigateTo(`${SERVICES_URL}/${item.id}`);
                      closeDropdownService();
                    }}
                    className="text-teal text-base capitalize"
                  >
                    {item.name}
                  </TextComponent>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-auto mb-12">
          <div
            onClick={closeDropdownService}
            className=" hover:opacity-90 cursor-pointer px-3 py-1 shadow-lg mb-2
               rounded-full bg-primary"
          >
            <TextComponent className="font-bold text-xl text-teal">X</TextComponent>
          </div>
        </div>
      </div>
    </div>
  );
}
