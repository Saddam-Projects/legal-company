import ButtonActionComponent from '@/components/ButtonAction';
import permission from '@/datasources/internals/permission';
import { Blog } from '@/entity/Blog';
import { Checkbox } from '@radix-ui/react-checkbox';
import { ColumnDef } from '@tanstack/react-table';

export const generateBlogColumn = (deleteHandler: (blog: Blog) => void, updateHandler: (blog: Blog) => void): ColumnDef<Blog>[] => {
  const blogColumn: ColumnDef<Blog>[] = [
    {
      id: 'select',
      header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
      cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => <div className="capitalize">{row.getValue('title')}</div>,
    },
    {
      accessorKey: 'author',
      header: 'Author',
      cell: ({ row }) => <div className="capitalize">{row.getValue('author')}</div>,
    },
    {
      accessorKey: 'category.name',
      header: 'kategori',
      id: 'category',
      cell: ({ row }) => <div className="capitalize">{row.getValue('category')}</div>,
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

  return blogColumn;
};

export const blogColumn: ColumnDef<Blog>[] = [
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
];
