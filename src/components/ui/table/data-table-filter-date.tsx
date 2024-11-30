"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "@/components/ui/calendar";
import { format, parse, subDays } from "date-fns";
import { useQueryState } from "nuqs"; // Using `nuqs` to manage query state
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export interface DataTableFilterDateProps {
  filterKey: string;
  title: string;
  setPage?: (value: number) => void;
}

export function DataTableFilterDateRange({
  filterKey,
  title,
  setPage,
}: DataTableFilterDateProps) {
  const [startDate, setStartDate] = useQueryState(`${filterKey}_gt`, {
    defaultValue: "",
  });
  const [endDate, setEndDate] = useQueryState(`${filterKey}_lt`, {
    defaultValue: "",
  });
  const formatDate = "dd-MM-yyyy";

  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: startDate ? parse(startDate, formatDate, new Date()) : undefined,
    to: endDate ? parse(endDate, formatDate, new Date()) : undefined,
  });
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setStartDate(range?.from ? format(range.from, formatDate) : "");
    setEndDate(range?.to ? format(range.to, formatDate) : "");
    if (setPage) setPage(0); // Reset page when date changes
  };

  const resetDates = () => {
    setDateRange(undefined);
    setStartDate("");
    setEndDate("");
  };

  return (
    <Popover open={showCalendar} onOpenChange={setShowCalendar}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[300px] justify-start text-left font-normal border-dashed flex items-center space-x-2"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange?.to ? (
              <>
                {format(dateRange?.from, formatDate)} {" tới "}
                {format(dateRange?.to, formatDate)}
              </>
            ) : (
              <>
                {"Từ "}
                {format(dateRange?.from, formatDate)}
              </>
            )
          ) : (
            <span>Chọn ngày</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleDateRangeChange}
          numberOfMonths={2}
        />
        <Button onClick={resetDates} variant="ghost" size="sm" className="mt-2">
          Đặt lại bộ lọc
        </Button>
      </PopoverContent>
    </Popover>
  );
}
