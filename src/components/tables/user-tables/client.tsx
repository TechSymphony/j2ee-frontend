"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useGetUserListQuery } from "@/queries/useUser";
import { useRefetch } from "@/contexts/app-context";
import { useEffect } from "react";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { getDefaultPaginatedResponse } from "@/schemas/paginate.schema";
import useQueryConfig from "@/hooks/useQueryConfig";

export const UserClient = () => {
  const router = useRouter();
  const queryConfig = useQueryConfig();
  const { data: fetchData, refetch } = useGetUserListQuery(queryConfig);
  const data = fetchData?.payload ?? getDefaultPaginatedResponse;

  const { setTriggerRefetch } = useRefetch();

  useEffect(() => {
    setTriggerRefetch(() => refetch);
  }, [refetch, setTriggerRefetch]);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Người dùng`}
          description=""
        />

        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm mới
        </Button>
      </div>
      <Separator />
      <DataTablePagination searchKey="fullName" columns={columns} data={data} />
    </>
  );
};
