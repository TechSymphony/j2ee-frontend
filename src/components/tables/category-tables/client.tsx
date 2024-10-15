"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useRefetch } from "@/contexts/app-context";
import React, { useEffect } from "react";
import { useGetCategoryListQuery } from "@/queries/useCategory";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { getDefaultPaginatedResponse } from "@/schemas/paginate.schema";
import useQueryConfig from "@/hooks/useQueryConfig";

export const CategoryClient = () => {
  const router = useRouter();
  const queryConfig = useQueryConfig();
  const { data: fetchData, refetch } = useGetCategoryListQuery(queryConfig);
  const data = fetchData?.payload ?? getDefaultPaginatedResponse;

  const { setTriggerRefetch } = useRefetch();

  useEffect(() => {
    setTriggerRefetch(() => refetch);
  }, [refetch, setTriggerRefetch]);

  return (
    <React.Fragment>
      <div className="flex items-start justify-between">
        <Heading title={`Categories`} description="" />

        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/category/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTablePagination searchKey="name" columns={columns} data={data} />
    </React.Fragment>
  );
};
