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
import { getDefaultPaginatedResponse } from "@/schemas/paginate.schema";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableComponentType } from "@/components/ui/table/data-table-factory-filter";
import { useEmployeeTableFilters } from "./beneficiary-filter";
import useQueryConfig from "./beneficiary-query-table";
import { ReviewStatusOptions } from "@/types/enum";
export const GENDER_OPTIONS = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];
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

  const { isAnyFilterActive, resetFilters, setPage, setSearchQuery } =
    useEmployeeTableFilters();

  const filters = [
    // {
    //   type: DataTableComponentType.Search,
    //   props: {
    //     filterKey: "user.fullName",
    //     searchQuery: "",
    //     setSearchQuery: setSearchQuery,
    //     setPage: setPage,
    //   },
    // },
    {
      type: DataTableComponentType.FilterBox,
      props: {
        filterKey: "verificationStatus",
        title: "Trạng thái duyệt",
        options: ReviewStatusOptions,
      },
    },
    {
      type: DataTableComponentType.ResetFilter,
      props: {
        isFilterActive: isAnyFilterActive,
        onReset: resetFilters,
      },
    },
  ];
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Beneficiaries (${data.page.totalElements})`}
          description=""
        />

        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/beneficiary/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm mới
        </Button>
      </div>
      <Separator />
      <DataTablePagination
        searchKey="user_name"
        columns={columns}
        data={data}
        filters={filters}
      />
    </>
  );
};
