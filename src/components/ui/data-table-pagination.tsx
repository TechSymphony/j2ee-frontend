"use client";
import {
    ColumnDef,
    PaginationState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { PaginatedResponse } from "../../schemas/paginate.schema";
import DataTableComponentFactory, {
    DataTableComponentProps,
    DataTableComponentType,
} from "./table/data-table-factory-filter";
import {
    DataTableSearch,
    DataTableSearchProps,
} from "./table/data-table-search";
import {
    DataTableFilterBox,
    DataTableFilterBoxProps,
} from "./table/data-table-filter-box";
import {
    DataTableResetFilter,
    DataTableResetFilterProps,
} from "./table/data-table-reset-filter";
import { DataTableFilterDateRange } from "./table/data-table-filter-date";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: PaginatedResponse<TData>;
    searchKey: string;
    pageSizeOptions?: number[];
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
    filters?: DataTableComponentProps[];
}

export function DataTablePagination<TData, TValue>({
    columns,
    data,
    pageSizeOptions = [10, 20, 30, 40, 50],
    filters,
}: DataTableProps<TData, TValue>) {
    // Search params
    const page = data.page?.number;
    const pageAsNumber = Number(page);
    const fallbackPage =
        isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
    const per_page = data.page.size;
    const perPageAsNumber = Number(per_page);
    const fallbackPerPage = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;

    // Handle server-side pagination
    const [{ pageIndex, pageSize }, setPagination] =
        React.useState<PaginationState>({
            pageIndex: fallbackPage,
            pageSize: fallbackPerPage,
        });

    const content = data?.content ?? [];
    const table = useReactTable({
        columns,
        data: content,
        pageCount: data?.page.totalPages ?? -1,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            pagination: { pageIndex, pageSize },
        },
        onPaginationChange: setPagination,
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: true,
        manualFiltering: true,
    });

    const resetPage = (value: number) => {
        table.setPageIndex(value);
    };
    const renderFilters = (filters: DataTableComponentProps[]) => {
        const listNameFilters: string[] = [];
        const elements = filters.map((filter) => {
            switch (filter.type) {
                case DataTableComponentType.Search:
                    listNameFilters.push(filter.props.filterKey);
                    filter.props.setPage = resetPage;
                    return (
                        <DataTableSearch
                            {...(filter.props as DataTableSearchProps)}
                        />
                    );
                case DataTableComponentType.FilterBox:
                    filter.props.setPage = resetPage;
                    listNameFilters.push(filter.props.filterKey);
                    return (
                        <DataTableFilterBox
                            key={filter.props.filterKey}
                            {...(filter.props as DataTableFilterBoxProps)}
                        />
                    );
                case DataTableComponentType.FilterDate:
                    filter.props.setPage = resetPage;
                    listNameFilters.push(filter.props.filterKey);
                    return (
                        <DataTableFilterDateRange
                            key={filter.props.filterKey}
                            {...(filter.props as DataTableFilterBoxProps)}
                        />
                    );
                default:
                    throw new Error(`Unknown component type`);
            }
        });
        elements.push(
            <DataTableResetFilter
                key={"reset-filter-data-table"}
                filters={listNameFilters}
            />
        );
        return elements;
    };

    return (
        <>
            <div className="flex flex-wrap items-center gap-4 mb-4">
                {filters?.length ? renderFilters(filters) : ""}
            </div>

            <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
                <Table className="relative">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table?.getRowModel()?.rows?.length &&
                        table?.getRowModel()?.rows?.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Không tìm thấy kết quả
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
                <div className="flex w-full items-center justify-between">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                        <div className="flex items-center space-x-2">
                            <p className="whitespace-nowrap text-sm font-medium">
                                Rows per page
                            </p>
                            <Select
                                value={`${
                                    table.getState().pagination.pageSize
                                }`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue
                                        placeholder={
                                            table.getState().pagination.pageSize
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {pageSizeOptions.map((pageSize) => (
                                        <SelectItem
                                            key={pageSize}
                                            value={`${pageSize}`}
                                        >
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            aria-label="Go to first page"
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() => table.setPageIndex(0)}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <DoubleArrowLeftIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        </Button>
                        <Button
                            aria-label="Go to previous page"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            <ChevronLeftIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        </Button>
                        <Button
                            aria-label="Go to next page"
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            <ChevronRightIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        </Button>
                        <Button
                            aria-label="Go to last page"
                            variant="outline"
                            className="hidden h-8 w-8 p-0 lg:flex"
                            onClick={() =>
                                table.setPageIndex(table.getPageCount() - 1)
                            }
                            disabled={!table.getCanNextPage()}
                        >
                            <DoubleArrowRightIcon
                                className="h-4 w-4"
                                aria-hidden="true"
                            />
                        </Button>
                        {/* <PaginationItem>
              <PaginationNext
                href={{
                  pathname,
                  query: {
                    page: pageIndex + 1,
                    limit: 10,
                  },
                }}
                onClick={(e) => {
                  if (page === pageSize) {
                    e.preventDefault();
                  }
                }}
              />
            </PaginationItem> */}
                    </div>
                </div>
            </div>
        </>
    );
}
