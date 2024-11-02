"use client";
import { useQueryState } from "nuqs";
import { Button } from "../button";

export type DataTableResetFilterProps = {
  filters: string[]; // name filters
};

export function DataTableResetFilter({ filters }: DataTableResetFilterProps) {
  // Create an array of query states for each filter to check if they are active
  const filterStates = filters.map((filter) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQueryState(filter, { defaultValue: "" })
  );

  // Determine if any filter is active
  const isFilterActive = filterStates.some(([value]) => value !== "");

  const resetFilters = () => {
    filterStates.forEach((filter) => {
      const [state, setState] = filter;
      setState(null);
    });
  };
  return (
    <>
      {isFilterActive ? (
        <Button variant="outline" onClick={resetFilters}>
          Đặt lại bộ lọc
        </Button>
      ) : null}
    </>
  );
}
