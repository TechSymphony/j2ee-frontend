"use client";
import { QueryConfig } from "@/hooks/useQueryConfig";
import useQueryParams from "@/hooks/useQueryParams";

export type campaignQueryConfig = QueryConfig & {
    "category.id"?: string;
};

export default function useQueryConfig() {
    const queryParams: QueryConfig = useQueryParams();
    return queryParams;
}
