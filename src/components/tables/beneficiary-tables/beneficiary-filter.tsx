import { parseAsInteger, useQueryState } from "nuqs";
import { useCallback, useMemo } from "react";

export function useEmployeeTableFilters() {
  // Define each filter state directly with `useQueryState`
  const [searchQuery, setSearchQuery] = useQueryState("query", {
    defaultValue: "",
  });

  const [genderFilter, setGenderFilter] = useQueryState("gender", {
    defaultValue: "",
    shallow: false, // Avoid page reload on this query change
  });

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  // Reset filters to their default values
  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setGenderFilter(null);
    setPage(1);
  }, [setSearchQuery, setGenderFilter, setPage]);

  // Check if any filter is active
  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!genderFilter;
  }, [searchQuery, genderFilter]);

  return {
    searchQuery,
    setSearchQuery,
    genderFilter,
    setGenderFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
  };
}
