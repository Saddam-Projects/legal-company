import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import TextComponent from '../Text';
import { useEffect } from 'react';
import { Service } from '@/entity/Service';
import serviceService from '@/services/service.service';
import { Cross2Icon } from '@radix-ui/react-icons';

export default function DetailService({ open, service, onClose }: { open: boolean; service: Service | null; onClose: () => void }) {
  const serviceAction = serviceService.getService(service ? service.id : '');

  useEffect(() => {
    if (open && service) {
      serviceAction.fetch();
    }
  }, [open, service]);

  return (
    <Dialog open={open}>
      {service && (
        <DialogContent className="z-50">
          <DialogHeader>
            <div className="flex justify-end">
              <Cross2Icon onClick={onClose} className="cursor-pointer" />
            </div>
          </DialogHeader>
          <div className="mb-4  flex-col flex space-y-2">
            <div className="flex flex-col space-y-2">
              <TextComponent className="text-lg font-bold">Nama Layanan</TextComponent>
              <TextComponent className="uppercase">{service.name}</TextComponent>
            </div>
            <TextComponent className="text-lg font-bold">Deskripsi</TextComponent>
          </div>
          <div className="flex flex-col space-y-4">
            {service.service_terms.map((e, index) => (
              <div key={index} className="p-2 border-1 rounded-sm dark:border-light">
                <TextComponent>{e.term_name}</TextComponent>
              </div>
            ))}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
