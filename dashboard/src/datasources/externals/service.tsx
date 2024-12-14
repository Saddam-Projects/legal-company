import ButtonActionComponent from '@/components/ButtonAction';
import { Button } from '@/components/ui/button';
import { Customer } from '@/entity/Customer';
import { Checkbox } from '@radix-ui/react-checkbox';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import permission from '../internals/permission';
import { Service } from '@/entity/Service';
import { formatCurrency } from '@/lib/currency';

export const serviceColumn: ColumnDef<Service>[] = [
  {
    id: 'select',
    header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="uppercase">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Price
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{(row.getValue('price') as number) > 0 ? formatCurrency(row.getValue('price')) : 'Hubungi Langsung'}</div>,
  },
  {
    accessorKey: 'action',
    header: () => <div className="text-right"></div>,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <ButtonActionComponent currentResource={permission.resources.EMPLOYEE} onClick={() => {}} buttonType={permission.permissionAction.UPDATE} />
          <ButtonActionComponent currentResource={permission.resources.EMPLOYEE} onClick={() => {}} buttonType={permission.permissionAction.VIEW_DETAIL} />
          <ButtonActionComponent currentResource={permission.resources.EMPLOYEE} onClick={() => {}} buttonType={permission.permissionAction.DELETE} />
        </div>
      );
    },
  },
];
