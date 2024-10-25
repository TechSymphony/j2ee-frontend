"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { useTransition } from "react";

export interface DataTableSearchProps {
    filterKey: string;
    setPage?: (value: number) => void;
    title: string;
}

export function DataTableSearch({
    filterKey,
    setPage,
    title,
}: DataTableSearchProps) {
    const [isLoading, startTransition] = useTransition();
    const [filterValue, setFilterValue] = useQueryState(filterKey, {
        defaultValue: "",
    });
    const handleSearch = (value: string) => {
        setFilterValue(value, { startTransition });
        if (setPage) setPage(0);
    };

    return (
        <Input
            placeholder={`Tìm kiếm ${title} ...`}
            value={filterValue ?? ""}
            onChange={(e) => handleSearch(e.target.value)}
            className={cn("w-full md:max-w-sm", isLoading && "animate-pulse")}
        />
    );
}
