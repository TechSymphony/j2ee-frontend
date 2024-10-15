"use client";
import useQueryParams from "./useQueryParams";

export type QueryConfig = {
  page?: number | string;
  limit?: number | string;
  sort_by?: "createdAt" | "view" | "sold" | "price";
  order?: "asc" | "desc";
  search?: string;
};
export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams();
  const queryConfig: QueryConfig = {
    page: queryParams.page || "1",
    limit: queryParams.limit,
  };

  return queryConfig;
}
