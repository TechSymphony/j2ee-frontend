"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useGetUserListQuery } from "@/queries/useUser";
import { useRefetch } from "@/contexts/app-context";
import { useEffect } from "react";

export const UserClient = () => {
  const router = useRouter();

  const { data: roleData, refetch } = useGetUserListQuery();
  const data = roleData?.payload ?? [];

  const { setTriggerRefetch } = useRefetch();

  useEffect(() => {
    setTriggerRefetch(() => refetch);
  }, [refetch, setTriggerRefetch]);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users (Client side table functionalities.)"
        />

        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="user.name" columns={columns} data={data} />
    </>
  );
};
