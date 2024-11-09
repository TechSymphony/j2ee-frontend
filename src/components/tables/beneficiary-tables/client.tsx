"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useGetBeneficiaryList } from "@/queries/useBeneficiary";
import { useRefetch } from "@/contexts/app-context";
import { useEffect } from "react";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import useQueryConfig from "@/hooks/useQueryConfig";
import { getDefaultPaginatedResponse } from "@/schemas/paginate.schema";

export const BeneficiaryClient = () => {
  const router = useRouter();
  const queryConfig = useQueryConfig();

  const { data: fetchData, refetch } = useGetBeneficiaryList(queryConfig);
  const data = fetchData?.payload ?? getDefaultPaginatedResponse;
  // const data = getDefaultPaginatedResponse;

  const { setTriggerRefetch } = useRefetch();

  useEffect(() => {
    setTriggerRefetch(() => refetch);
  }, [refetch, setTriggerRefetch]);

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Beneficiaries`}
          description=""
        />

        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/role/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm mới
        </Button>
      </div>
      <Separator />
      <DataTablePagination searchKey="" columns={columns} data={data} />
    </>
  );
};
