"use client";

import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddRole from "@/app/manage/roles/add-role";
import EditRole from "@/app/manage/roles/edit-role";
import { createContext, useContext, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSearchParams } from "next/navigation";
import AutoPagination from "@/components/auto-pagination";
import { RoleType } from "@/schemas/role.schema";
import { useDeleteRoleMutation, useGetRoleListQuery } from "@/queries/useRole";
import { toast } from "@/hooks/use-toast";
import { handleErrorFromApi } from "@/lib/utils";

const RoleTableContext = createContext<{
  setRoleIdEdit: (value: number) => void;
  roleIdEdit: number | undefined;
  roleDelete: RoleType | null;
  setRoleDelete: (value: RoleType | null) => void;
}>({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setRoleIdEdit: (value: number | undefined) => {},
  roleIdEdit: undefined,
  roleDelete: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setRoleDelete: (value: RoleType | null) => {},
});

export const columns: ColumnDef<RoleType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Mô tả",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: function Actions({ row }) {
      const { setRoleIdEdit, setRoleDelete } = useContext(RoleTableContext);
      const openEditRole = () => {
        setRoleIdEdit(row.original.id);
      };

      const openDeleteRole = () => {
        setRoleDelete(row.original);
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={openEditRole}>Sửa</DropdownMenuItem>
            <DropdownMenuItem onClick={openDeleteRole}>Xóa</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function AlertDialogDeleteAccount({
  roleDelete,
  setRoleDelete,
}: {
  roleDelete: RoleType | null;
  setRoleDelete: (value: RoleType | null) => void;
}) {
  const deleteRoleMutation = useDeleteRoleMutation();
  const deleteRole = async () => {
    try {
      if (roleDelete) {
        await deleteRoleMutation.mutateAsync(roleDelete.id);
        setRoleDelete(null);
        toast({
          description: "Xóa vai trò thành công",
          duration: 5000,
        });
      }
    } catch (error) {
      console.log(error);
      handleErrorFromApi({
        error,
      });
    }
  };

  return (
    <AlertDialog
      open={Boolean(roleDelete)}
      onOpenChange={(value) => {
        if (!value) {
          setRoleDelete(null);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Xóa vai trò?</AlertDialogTitle>
          <AlertDialogDescription>
            Vai trò{" "}
            <span className="bg-foreground text-primary-foreground rounded px-1">
              {roleDelete?.name}
            </span>{" "}
            sẽ bị xóa vĩnh viễn
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={deleteRole}>Tiếp tục</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
// Số lượng row trên một trang
const PAGE_SIZE = 10;
export default function AccountTable() {
  const searchParam = useSearchParams();
  const page = searchParam.get("page") ? Number(searchParam.get("page")) : 1;
  const pageIndex = page - 1;
  // const params = Object.fromEntries(searchParam.entries())
  const [roleIdEdit, setRoleIdEdit] = useState<number | undefined>();
  const [roleDelete, setRoleDelete] = useState<RoleType | null>(null);
  const [sorting, setSorting] = useState<SortingState>([]);

  const getRoleListQuery = useGetRoleListQuery();
  const data = getRoleListQuery.data?.payload ?? [];
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({
    pageIndex,
    pageSize: PAGE_SIZE,
  });

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  useEffect(() => {
    table.setPagination({
      pageIndex,
      pageSize: PAGE_SIZE,
    });
  }, [table, pageIndex]);

  return (
    <RoleTableContext.Provider
      value={{
        roleIdEdit,
        setRoleIdEdit,
        roleDelete,
        setRoleDelete,
      }}
    >
      <div className="w-full">
        <EditRole
          id={roleIdEdit}
          setId={setRoleIdEdit}
          onSubmitSuccess={() => {}}
        />
        <AlertDialogDeleteAccount
          roleDelete={roleDelete}
          setRoleDelete={setRoleDelete}
        />
        <div className="flex items-center py-4">
          <Input
            placeholder="Tìm kiếm vai trò..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="ml-auto flex items-center gap-2">
            <AddRole />
          </div>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
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
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-xs text-muted-foreground py-4 flex-1 ">
            Hiển thị{" "}
            <strong>{table.getPaginationRowModel().rows.length}</strong> trong{" "}
            <strong>{data.length}</strong> kết quả
          </div>
          <div>
            <AutoPagination
              page={table.getState().pagination.pageIndex + 1}
              pageSize={table.getPageCount()}
              pathname="/manage/roles"
            />
          </div>
        </div>
      </div>
    </RoleTableContext.Provider>
  );
}
