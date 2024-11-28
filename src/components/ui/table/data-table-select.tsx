"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQueryState } from "nuqs";
import React from "react";

export interface FilterOption {
  value: string;
  label: string;
}

export interface DataTableSelectProps {
  filterKey: string;
  title: string;
  options: FilterOption[];
  setPage?: (value: number) => void;
}

export function DataTableFilterSelect({
  filterKey,
  title,
  options,
}: DataTableSelectProps) {
  const [filterValue, setFilterValue] = useQueryState(filterKey, {
    defaultValue: "",
  });

  return (
    <Select
      onValueChange={(value: string) => setFilterValue(value)}
      value={filterValue ?? ""}
    >
      <SelectTrigger className="min-w-[240px]">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options &&
            options.map((option, index) => (
              <SelectItem value={option.value} key={index}>
                {option.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
