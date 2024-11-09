import React, { lazy, Suspense, useEffect } from "react";
import { useRefetch } from "@/contexts/app-context";
import { useGetCampaignClientListQuery } from "@/queries/useCampaign";
import { useRouter } from "next/navigation";
import useQueryConfig from "../tables/campaign-tables/campaign-query-table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { parseAsInteger, useQueryState } from "nuqs";
import { DataTableSearch } from "../ui/table/data-table-search";
import {
  DataTableFilterBoxHiarachy,
  FilterOptionHiarachy,
} from "../ui/table/data-table-filter-box-hiarachy";
import { useGetCategoryMenus } from "@/queries/useCategory";
import { CategoryMenu } from "@/schemas/category.schema";
// import { CampaignType } from "@/schemas/campaign.schema";

const Campaign = lazy(() => import("@/components/campaign/campaign"));
function convertCategoryToFilterOption(
  category: CategoryMenu
): FilterOptionHiarachy {
  // Convert each category to FilterOption
  const filterOption: FilterOptionHiarachy = {
    value: category.id.toString(), // Use `id` as the value (string type)
    label: category.name, // Use `name` as the label
    children: category.children?.map(convertCategoryToFilterOption), // Recursively map children
  };

  return filterOption;
}

export default function CampaignList() {
  const queryConfig = useQueryConfig();

  const { data } = useGetCategoryMenus();
  const categoryMenuList = data?.payload;

  const {
    data: campaignListData,
    isLoading,
    refetch,
  } = useGetCampaignClientListQuery(queryConfig);
  const campaigns = campaignListData?.payload.content ?? [];

  const [pageIndex, setPageIndex] = useQueryState(
    "page",
    parseAsInteger.withDefault(0)
  );

  const totalPages = campaignListData?.payload.page.totalPages;

  const { setTriggerRefetch } = useRefetch();
  const router = useRouter();
  useEffect(() => {
    setTriggerRefetch(() => refetch);
  }, [refetch, setTriggerRefetch]);

  useEffect(() => {
    refetch();
  }, [pageIndex, refetch]);

  const handlePageChange = (newPage: number) => {
    setPageIndex(newPage);
  };

  return (
    <div>
      <div className="my-2 py-4 flex gap-4 ">
        <DataTableSearch
          filterKey={"name"}
          title={"tên"}
          setPage={setPageIndex}
        ></DataTableSearch>
        <DataTableFilterBoxHiarachy
          setPage={setPageIndex}
          filterKey={"category.id"}
          title={"Danh mục"}
          options={categoryMenuList?.map(convertCategoryToFilterOption) ?? []}
        ></DataTableFilterBoxHiarachy>
      </div>
      {isLoading ? ( // Nếu dữ liệu đang được tải thì hiển thị Loading
        <>
          <div>Đang tải...</div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 my-4">
            {campaigns &&
              campaigns.map((campaign, index) => (
                <Suspense key={index} fallback={<div>DD...</div>}>
                  <div onClick={() => router.push(`/campaign/${campaign.id}`)}>
                    <Campaign data={campaign} />
                  </div>
                </Suspense>
              ))}
          </div>
          {totalPages && totalPages > 1 ? (
            <>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (pageIndex > 0) handlePageChange(pageIndex - 1);
                      }}
                    >
                      Trước
                    </PaginationPrevious>
                  </PaginationItem>

                  {/* Loop through total pages and display each page number */}
                  {[...Array(totalPages)].map((_, idx) => (
                    <PaginationItem key={idx}>
                      <PaginationLink
                        href="#"
                        isActive={pageIndex === idx}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(idx);
                        }}
                      >
                        {idx + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  {/* Pagination Ellipsis (for larger number of pages) */}
                  {totalPages > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (pageIndex < totalPages - 1)
                          handlePageChange(pageIndex + 1);
                      }}
                    >
                      Sau
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
