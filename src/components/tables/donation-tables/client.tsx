"use client";
// import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
// import { Plus } from "lucide-react";
// import { useRouter } from "next/navigation";
import { columns } from "./columns";
import {
  useGetDonationListQuery,
  useGetMyDonationListQuery,
} from "@/queries/useDonation";
import { useRefetch } from "@/contexts/app-context";
import { useEffect } from "react";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableComponentType } from "@/components/ui/table/data-table-factory-filter";
import { getDefaultPaginatedResponse } from "@/schemas/paginate.schema";
import useQueryConfig from "@/components/tables/donation-tables/donation-query-table";
import {
  AnonymousDonationOptions,
  ReviewDonationOptions,
} from "../../../types/enum";
import { Button } from "@/components/ui/button";
import { ExportDonationDialog } from "@/components/dialog/export-donation";

interface Props {
  type: "admin" | "user";
}

export const DonationClient = ({ type }: Props) => {
  // const router = useRouter();
  const queryConfig = useQueryConfig();
  const adminQuery = useGetDonationListQuery(queryConfig);
  const userQuery = useGetMyDonationListQuery(queryConfig);

  const { data: donationData, refetch } =
    type === "admin" ? adminQuery : userQuery;

  const data = donationData?.payload ?? getDefaultPaginatedResponse;

  const { setTriggerRefetch } = useRefetch();

  useEffect(() => {
    setTriggerRefetch(() => refetch);
  }, [refetch, setTriggerRefetch]);

  const filters = [
    {
      type: DataTableComponentType.Search,
      props: {
        filterKey: "donor.fullName",
        title: "người dùng",
      },
    },
    {
      type: DataTableComponentType.FilterBox,
      props: {
        filterKey: "status",
        title: "Trạng thái duyệt",
        options: ReviewDonationOptions,
      },
    },
    {
      type: DataTableComponentType.FilterDate,
      props: {
        filterKey: "donationDate",
        title: "Ngày duyệt",
      },
    },
    {
      type: DataTableComponentType.FilterBox,
      props: {
        filterKey: "isAnonymous",
        title: "Tiết lộ",
        options: AnonymousDonationOptions,
      },
    },
  ];

  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <Heading
          title={
            type === "admin"
              ? `Quản lý quyên góp (${data.page.totalElements})`
              : `Lịch sử quyên góp (${data.page.totalElements})`
          }
          description={""}
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/campaign/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
        <ExportDonationDialog />
      </div>
      <Separator />
      <DataTablePagination
        searchKey=""
        columns={columns}
        data={data}
        filters={filters}
      />
    </>
  );
};
