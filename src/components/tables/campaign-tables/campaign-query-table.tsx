"use client";
import { QueryConfig } from "@/hooks/useQueryConfig";
import useQueryParams from "@/hooks/useQueryParams";

export type campaignQueryConfig = QueryConfig & {
  gender?: string;
};

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams();
  return queryParams;
}
