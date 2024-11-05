"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useGetCampaignList } from "@/queries/useCampaign";
import { useRefetch } from "@/contexts/app-context";
import { useEffect } from "react";
import { getDefaultPaginatedResponse } from "@/schemas/paginate.schema";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableComponentType } from "@/components/ui/table/data-table-factory-filter";
import useQueryConfig from "./campaign-query-table";
import { ReviewStatusOptions } from "@/types/enum";



export const CampaignClient = () => {
  const router = useRouter();
  const queryConfig = useQueryConfig();

  const { data: fetchData, refetch } = useGetCampaignList(queryConfig);
  const data = fetchData?.payload ?? getDefaultPaginatedResponse;
  // const data = getDefaultPaginatedResponse;

  const { setTriggerRefetch } = useRefetch();

  useEffect(() => {
    setTriggerRefetch(() => refetch);
  }, [refetch, setTriggerRefetch]);

  const filters = [
    {
      type: DataTableComponentType.Search,
      props: {
        filterKey: "user.fullName",
        title: "người dùng",
      },
    },
    {
      type: DataTableComponentType.FilterBox,
      props: {
        filterKey: "status",
        title: "Trạng thái duyệt",
        options: ReviewStatusOptions,
      },
    },
    {
      type: DataTableComponentType.FilterDate,
      props: {
        filterKey: "createAt",
        title: "Trạng thái duyệt",
      },
    },
  ];
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Quản lý chiến dịch (${data.page.totalElements})`}
          description=""
        />

        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/campaign/new`)}
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