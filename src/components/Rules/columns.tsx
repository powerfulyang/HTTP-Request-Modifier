import type { ColumnDef } from '@tanstack/react-table';
import type browser from 'webextension-polyfill';

export const columns: ColumnDef<browser.DeclarativeNetRequest.Rule>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      return <pre>{JSON.stringify(row.original.action, null, 2)}</pre>;
    },
  },
  {
    accessorKey: 'condition',
    header: 'Condition',
    cell: ({ row }) => {
      return <pre>{JSON.stringify(row.original.condition, null, 2)}</pre>;
    },
  },
];
