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

export interface FilterOption {
    value: string;
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
}

export interface DataTableFilterBoxProps {
    filterKey: string;
    title: string;
    options: FilterOption[];
    setPage?: (value: number) => void;
}

export function DataTableFilterBox({
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
        value = "" + value;
        const newSet = new Set(selectedValuesSet);

        if (newSet.has(value)) {
            newSet.delete(value);
        } else {
            newSet.add(value);
        }
        if (setPage) setPage(0);
        setFilterValue(Array.from(newSet).join(",") || null);
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
                            <Separator
                                orientation="vertical"
                                className="mx-2 h-4"
                            />
                            <Badge
                                variant="secondary"
                                className="rounded-sm px-1 font-normal lg:hidden"
                            >
                                {selectedValuesSet.size}
                            </Badge>
                            <div className="hidden space-x-1 lg:flex">
                                {selectedValuesSet.size > 2 ? (
                                    <Badge
                                        variant="secondary"
                                        className="rounded-sm px-1 font-normal"
                                    >
                                        {selectedValuesSet.size} đã chọn
                                    </Badge>
                                ) : (
                                    Array.from(selectedValuesSet).map(
                                        (value) => (
                                            <Badge
                                                variant="secondary"
                                                key={value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {options.find(
                                                    (option) =>
                                                        option.value == value
                                                )?.label || value}
                                            </Badge>
                                        )
                                    )
                                )}
                            </div>
                        </>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder={title} />
                    <CommandList>
                        <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => handleSelect(option.value)}
                                >
                                    <div
                                        className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            selectedValuesSet.has(
                                                "" + option.value
                                            )
                                                ? "bg-primary text-primary-foreground"
                                                : "opacity-50 [&_svg]:invisible"
                                        )}
                                    >
                                        <CheckIcon
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    {option.icon && (
                                        <option.icon
                                            className="mr-2 h-4 w-4 text-muted-foreground"
                                            aria-hidden="true"
                                        />
                                    )}
                                    <span>{option.label}</span>
                                </CommandItem>
                            ))}
                        </CommandGroup>
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
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
