import { ColumnDef } from '@tanstack/react-table';
import { Order, OrderItem } from '@/entity/Order';
import { formatCurrency } from '@/lib/currency';
import { Checkbox } from '@radix-ui/react-checkbox';

export interface OrderCol extends Order {
  order_item: OrderItem;
}

export const orderColumn: ColumnDef<OrderCol>[] = [
  {
    id: 'select',
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'total_price',
    header: 'Total Price',
    cell: ({ row }) => <div className="capitalize">{row.getValue('total_price') ? formatCurrency(row.getValue('total_price')) : 'Hubungi Langsung'}</div>,
  },
  {
    accessorKey: 'customer.name',
    header: 'Customer Name',
    id: 'name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'customer.phone',
    header: 'Customer Phone',
    id: 'phone',
    cell: ({ row }) => <div className="capitalize">{row.getValue('phone')}</div>,
  },
  {
    accessorKey: 'customer.email',
    header: 'Customer Email',
    id: 'email',
    cell: ({ row }) => <div>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'order_item.service.name',
    header: 'Layanan',
    id: 'service',
    cell: ({ row }) => <div className="uppercase">{row.getValue('service')}</div>,
  },
  {
    accessorKey: 'description',
    header: 'Message',
    id: 'description',
    cell: ({ row }) => <div className="uppercase">{row.getValue('description') ?? '-'}</div>,
  },
];
