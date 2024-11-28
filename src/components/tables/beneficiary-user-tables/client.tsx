"use client";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { useGetMyBeneficiaryListQuery } from "@/queries/useBeneficiary";
import { getDefaultPaginatedResponse } from "@/schemas/paginate.schema";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { DataTableComponentType } from "@/components/ui/table/data-table-factory-filter";
import useQueryConfig from "./beneficiary-query-table";
import { ReviewStatusOptions } from "@/types/enum";
import { useState } from "react";
import BeneficiaryClientPopup from "@/components/modal/popup-beneficiary-client";

export const BeneficiaryUserTable = () => {
  const router = useRouter();
  const queryConfig = useQueryConfig();

  const { data: beneficiaryData } = useGetMyBeneficiaryListQuery(queryConfig);

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

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState<"create" | "edit" | "show">(
    "create"
  );
  const [selectedId, setSelectedId] = useState<number | undefined>(undefined);

  const handleAddNew = () => {
    setPopupMode("create");
    setSelectedId(undefined);
    setPopupOpen(true);
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Lịch sử gửi nguyện vọng (${data.page.totalElements})`}
          description=""
        />

        <Button className="text-xs md:text-sm" onClick={handleAddNew}>
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
      <BeneficiaryClientPopup
        id={selectedId}
        setId={setSelectedId}
        mode={popupMode}
        open={popupOpen}
        setOpen={setPopupOpen}
      />
    </>
  );
};
