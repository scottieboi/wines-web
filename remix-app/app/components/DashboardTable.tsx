import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

export type WineRow = {
  wineName: string;
  vineyard: string;
  vintage: number;

  wineType: string;

  region: string;
};

const defaultData: WineRow[] = [
  {
    wineName: "tanner",
    vineyard: "linsley",
    vintage: 24,
    wineType: "In Relationship",
    region: "Blah",
  },
  {
    wineName: "tandy",
    vineyard: "miller",
    vintage: 40,
    region: "Blah",
    wineType: "Single",
  },
  {
    wineName: "joe",
    vineyard: "dirte",
    vintage: 45,
    region: "Blah",
    wineType: "Complicated",
  },
];

const columnHelper = createColumnHelper<WineRow>();

const columns = [
  columnHelper.accessor("wineName", {
    cell: (info) => info.getValue(),
    header: "Wine Name",
  }),
  columnHelper.accessor("vineyard", {
    cell: (info) => info.getValue(),
    header: "Vineyard",
  }),
  columnHelper.accessor("vintage", {
    cell: (info) => info.getValue(),
    header: "Vintage",
  }),
  columnHelper.accessor("wineType", {
    cell: (info) => info.getValue(),
    header: "Wine Type",
  }),
  columnHelper.accessor("region", {
    cell: (info) => info.getValue(),
    header: "Region",
  }),
];

export default function DashboardTable({
  data,
  pageCount,
}: {
  data: WineRow[];
  pageCount: number;
}) {
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  return (
    <div className="p-2">
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
      <div className="h-2" />
      <div className="flex items-center gap-2">
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border p-1"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{table.getRowModel().rows.length} Rows</div>
      <pre>{JSON.stringify(pagination, null, 2)}</pre>
      <div className="h-4" />
    </div>
  );
}
