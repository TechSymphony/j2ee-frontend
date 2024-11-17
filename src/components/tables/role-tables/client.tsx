"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useGetRoleListQuery } from "@/queries/useRole";
import { DataTableComponentType } from "@/components/ui/table/data-table-factory-filter";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import useQueryConfig from "@/components/tables/role-tables/role-query-table";
import { getDefaultPaginatedResponse } from "@/schemas/paginate.schema";
import { useRoutePermission } from "@/hooks/use-route-permission";

export const RoleClient = () => {
  const router = useRouter();
  const queryConfig = useQueryConfig();
  const { data: roleData } = useGetRoleListQuery(queryConfig);
  const data = roleData?.payload ?? getDefaultPaginatedResponse;

  const { requiredPermission, currentRoute, requiresPermission } =
    useRoutePermission();

  // Will output "MANAGE_ROLES" when on /dashboard/role
  console.log({ requiredPermission, currentRoute, requiresPermission });

  const filters = [
    {
      type: DataTableComponentType.Search,
      props: {
        filterKey: "name",
        title: "tên chức vụ",
      },
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title={`Quản lý chức vụ`} description="" />

        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/role/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm mới
        </Button>
      </div>
      <Separator />
      <DataTablePagination
        searchKey="name"
        columns={columns}
        data={data}
        filters={filters}
      />
    </>
  );
};
