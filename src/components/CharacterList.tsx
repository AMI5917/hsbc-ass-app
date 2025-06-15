import React from 'react';
import {
  useQuery,
} from '@tanstack/react-query';
import {
  useSearch,
  useNavigate,
} from '@tanstack/react-router';
import {
  getCoreRowModel,
  useReactTable,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import { fetchCharacters } from '../api/rickAndMorty';
import type { Character, CharacterResponse } from '../api/rickAndMorty';
import '../style.css';

const columnHelper = createColumnHelper<Character>();

export const CharacterList: React.FC = () => {
  const navigate = useNavigate();

  const search = useSearch({ from: '/' });
  const page = search.page ?? 1;

  const {
    data,
    isLoading,
  } = useQuery<CharacterResponse, Error>({
    queryKey: ['characters', page],
    queryFn: () => fetchCharacters(page),
    placeholderData: previousData => previousData
  });

  // Table columns
  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('species', {
      header: 'Species',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: info => info.getValue(),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <button className='viewButton' onClick={() => navigate({ to: `/character/${row.original.id}` })}>
          View
        </button>
      ),
    }),
  ];

  const table = useReactTable({
    data: data?.results ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Rick & Morty Characters</h2>
      <button className='refreshButton' onClick={() => window.location.reload()} >Refresh</button>

      <table style={{ width: '100%', marginTop: '1rem' }}>
        <thead>
          {table.getHeaderGroups().map((group) => (
            <tr key={group.id}>
              {group.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() =>
            navigate({
            search: ((prev: { page?: number }) => ({
                ...prev,
                page: Math.max((prev.page ?? 1) - 1, 1),
            })) as any,
            })
          }
          disabled={page === 1}
        >
          Previous
        </button>

        <span style={{ margin: '0 1rem' }}>Page {page}</span>

        <button
          onClick={() =>
            navigate({
            search: ((prev: { page?: number }) => ({
                ...prev,
                page: Math.max((prev.page ?? 1) + 1),
            })) as any,
            })
          }
          disabled={!data?.info?.next}
        >
          Next
        </button>
      </div>
    </div>
  );
};
