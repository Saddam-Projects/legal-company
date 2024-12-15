import ButtonActionComponent from '@/components/ButtonAction';
import { Button } from '@/components/ui/button';
import { Customer } from '@/entity/Customer';
import { Checkbox } from '@radix-ui/react-checkbox';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { ColumnDef } from '@tanstack/react-table';
import permission from '../internals/permission';

export const generateCustomerColumn = (deleteHandler: (customer: Customer) => void, updateHandler: (customer: Customer) => void): ColumnDef<Customer>[] => {
  const customerColumn: ColumnDef<Customer>[] = [
    {
      id: 'select',
      header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
      cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => <div className="capitalize">{row.getValue('phone')}</div>,
    },
    {
      accessorKey: 'email',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Email
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'message',
      header: 'Message',
      cell: ({ row }) => <div className="capitalize">{row.getValue('message') ?? '-'}</div>,
    },
    {
      accessorKey: 'action',
      header: () => <div className="text-right"></div>,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <ButtonActionComponent currentResource={permission.resources.EMPLOYEE} onClick={() => updateHandler(row.original)} buttonType={permission.permissionAction.UPDATE} />
            <ButtonActionComponent currentResource={permission.resources.EMPLOYEE} onClick={() => deleteHandler(row.original)} buttonType={permission.permissionAction.DELETE} />
          </div>
        );
      },
    },
  ];

  return customerColumn;
};
