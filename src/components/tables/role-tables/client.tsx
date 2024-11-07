"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useGetRoleListQuery } from "@/queries/useRole";
import { useRefetch } from "@/contexts/app-context";
import { useEffect } from "react";

export const RoleClient = () => {
  const router = useRouter();

  const { data: roleData, refetch } = useGetRoleListQuery();
  const data = roleData?.payload ?? [];

  const { setTriggerRefetch } = useRefetch();

  useEffect(() => {
    setTriggerRefetch(() => refetch);
  }, [refetch, setTriggerRefetch]);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Quản lý chức vụ (${data.length})`}
          description="Manage roles (Client side table functionalities.)"
        />

        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/role/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm mới
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
