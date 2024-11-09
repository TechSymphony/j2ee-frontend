"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import { Options, useQueryState } from "nuqs";
import React from "react";
import { string } from "zod";

export interface FilterOptionHiarachy {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: FilterOptionHiarachy[]; // Add children field for hierarchical data
}

export interface DataTableFilterBoxProps {
  filterKey: string;
  title: string;
  options: FilterOptionHiarachy[];
  setPage?: (value: number) => void;
}

export function DataTableFilterBoxHiarachy({
  filterKey,
  title,
  options,
  setPage,
}: DataTableFilterBoxProps) {
  const [filterValue, setFilterValue] = useQueryState(filterKey, {
    defaultValue: "",
  });

  const selectedValuesSet = React.useMemo(() => {
    if (!filterValue) return new Set<string>();
    const values = filterValue.split(",");
    return new Set(values.filter((value) => value !== ""));
  }, [filterValue]);

  const handleSelect = (value: string) => {
    const newSet = new Set(selectedValuesSet);
    const option = findOptionByValue(value, options);

    if (!option) return;

    const toggleValue = (v: string) => {
      value = "" + value;
      if (newSet.has(v)) newSet.delete(v);
      else newSet.add(v);
    };

    const toggleChild = (parent: string) => {
      if (newSet.has(parent)) {
        if (option.children && option.children.length > 0) {
          option.children.forEach((child) => {
            if (!newSet.has(child.value)) newSet.add(child.value);
          });
        }
      } else {
        if (option.children && option.children.length > 0) {
          option.children.forEach((child) => {
            if (newSet.has(child.value)) newSet.delete(child.value);
          });
        }
      }
    };

    // Toggle parent and all children
    if (option.children && option.children.length > 0) {
      toggleValue(option.value); // Toggle the parent itself
      toggleChild(option.value);
    } else {
      // Check if this is a child and ensure its parent is selected
      toggleValue(option.value);
      const parent = findParentOption(option.value, options);
      if (parent) {
        const allChildrenSelected = parent.children!.every((child) =>
          newSet.has(child.value)
        );
        if (allChildrenSelected) newSet.add(parent.value);
        else if (newSet.has(parent.value)) newSet.delete(parent.value);
      }
    }

    setFilterValue(Array.from(newSet).join(",") || null);
    if (setPage) setPage(0);
  };

  const resetFilter = () => setFilterValue(null);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="border-dashed">
          <PlusCircledIcon className="mr-2 h-4 w-4" />
          {title}
          {selectedValuesSet.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValuesSet.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValuesSet.size > 3 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValuesSet.size} đã chọn
                  </Badge>
                ) : (
                  Array.from(selectedValuesSet).map((value) => (
                    <Badge
                      variant="secondary"
                      key={value}
                      className="rounded-sm px-1 font-normal"
                    >
                      {findOptionByValue(value, options)?.label || value}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px] w-auto p-2" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <React.Fragment key={option.value}>
                  <CommandItem
                    onSelect={() => handleSelect(option.value)}
                    className={option.children ? "font-semibold" : "pl-6"}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selectedValuesSet.has(option.value)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    {option.icon && (
                      <option.icon
                        className="mr-2 h-4 w-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                  {option.children && (
                    <CommandGroup className="ml-4 pl-4 border-l">
                      {option.children.map((child) => (
                        <CommandItem
                          key={child.value}
                          onSelect={() => handleSelect(child.value)}
                          className="pl-6"
                        >
                          <div
                            className={cn(
                              "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                              selectedValuesSet.has(child.value)
                                ? "bg-primary text-primary-foreground"
                                : "opacity-50 [&_svg]:invisible"
                            )}
                          >
                            <CheckIcon className="h-4 w-4" aria-hidden="true" />
                          </div>
                          {child.icon && (
                            <child.icon
                              className="mr-2 h-4 w-4 text-muted-foreground"
                              aria-hidden="true"
                            />
                          )}
                          <span>{child.label}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </React.Fragment>
              ))}
            </CommandGroup>
          </CommandList>
          {selectedValuesSet.size > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  onSelect={resetFilter}
                  className="justify-center text-center"
                >
                  Đặt lại bộ lọc
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Helper functions to find the option and its parent in the hierarchy
function findOptionByValue(
  value: string,
  options: FilterOptionHiarachy[]
): FilterOptionHiarachy | undefined {
  for (const option of options) {
    if (option.value === value) return option;
    if (option.children) {
      const found = findOptionByValue(value, option.children);
      if (found) return found;
    }
  }
}

function findParentOption(
  value: string,
  options: FilterOptionHiarachy[],
  parent?: FilterOptionHiarachy
): FilterOptionHiarachy | undefined {
  for (const option of options) {
    if (option.value === value) return parent;
    if (option.children) {
      const found = findParentOption(value, option.children, option);
      if (found) return found;
    }
  }
}
