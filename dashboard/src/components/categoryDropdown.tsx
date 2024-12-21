import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import serviceService from '@/services/service.service';
import { formatCurrency } from '@/lib/currency';

export default function CategoryDropdownComponent({
  field,
  form,
}: {
  field: ControllerRenderProps<{ category: string; title: string; content: string; image: string; author: string }, 'category'>;
  form: UseFormReturn<{ category: string; title: string; content: string; image: string; author: string }, any, undefined>;
}) {
  const service = serviceService.getServices(10000000000, 0);

  return (
    <Select {...field} onValueChange={(value) => form.setValue('category', value)}>
      <SelectTrigger className="border border-black dark:border-white">
        <SelectValue placeholder="Pilih" />
      </SelectTrigger>
      <SelectContent>
        {service.services.map((item) => (
          <SelectItem className="uppercase" value={item.id} key={item.id}>
            {item.name} - {item.price > 0 ? formatCurrency(item.price) : 'Hubungi Langsung'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
