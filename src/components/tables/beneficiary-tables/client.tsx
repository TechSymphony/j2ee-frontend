"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useGetBeneficiaryList } from "@/queries/useBeneficiary";
import { getDefaultPaginatedResponse } from "@/schemas/paginate.schema";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableComponentType } from "@/components/ui/table/data-table-factory-filter";
import useQueryConfig from "./beneficiary-query-table";
import { ReviewStatusOptions } from "@/types/enum";

export const BeneficiaryClient = () => {
  const router = useRouter();
  const queryConfig = useQueryConfig();

  const { data: beneficiaryData } = useGetBeneficiaryList(queryConfig);

  const data = beneficiaryData?.payload ?? getDefaultPaginatedResponse;

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
        filterKey: "verificationStatus",
        title: "Trạng thái duyệt",
        options: ReviewStatusOptions,
      },
    },
    {
      type: DataTableComponentType.FilterDate,
      props: {
        filterKey: "createAt",
        title: "Ngày tạo người thụ hưởng",
      },
    },
  ];
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Quản lý người thụ hưởng (${beneficiaryData?.payload?.page?.totalElements})`}
          description=""
        />

        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/beneficiary/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm mới
        </Button>
      </div>
      <Separator className="my-4" />
      <DataTablePagination
        searchKey="user_name"
        columns={columns}
        data={data}
        filters={filters}
      />
    </>
  );
};
