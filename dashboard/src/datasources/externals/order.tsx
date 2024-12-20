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
    id: 'customer.name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('customer.name')}</div>,
  },
  {
    accessorKey: 'customer.phone',
    header: 'Customer Phone',
    id: 'customer.phone',
    cell: ({ row }) => <div className="capitalize">{row.getValue('customer.phone')}</div>,
  },
  {
    accessorKey: 'customer.email',
    header: 'Customer Email',
    id: 'customer.email',
    cell: ({ row }) => <div>{row.getValue('customer.email')}</div>,
  },
  {
    accessorKey: 'order_item.service.name',
    header: 'Layanan',
    id: 'order_item.service.name',
    cell: ({ row }) => <div className="uppercase">{row.getValue('order_item.service.name')}</div>,
  },
  {
    accessorKey: 'description',
    header: 'Message',
    id: 'description',
    cell: ({ row }) => <div className="uppercase">{row.getValue('description') ?? '-'}</div>,
  },
];
