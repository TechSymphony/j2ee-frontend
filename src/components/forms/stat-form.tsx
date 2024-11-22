import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useQueryState } from "nuqs";
import { DataTableFilterDateRange } from "@/components/ui/table/data-table-filter-date";

export default function StatForm() {
  const [type, setType] = useQueryState("type");

  // React.useEffect(() => {
  //   console.log(pageIndex, pageSize);
  //   setPageIndexQueryValue("" + pageIndex);
  //   setPageSizeQueryValue("" + pageSize);
  // }, [pageIndex, pageSize, setPageIndexQueryValue, setPageSizeQueryValue]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Filter />{" "}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => {
          // Ngăn việc đóng menu khi click vào bất kỳ nội dung nào bên trong
          e.stopPropagation();
        }}
      >
        <DropdownMenuLabel>Bộ lọc</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem className=" hover:!bg-transparent">
          
        </DropdownMenuItem> */}
        <div className="flex flex-col gap-2 px-2 py-4 w-full">
          <span className="inline-block">Loại thống kê</span>
          <Select onValueChange={(value: string) => setType(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {/* <SelectLabel>Fruits</SelectLabel> */}
                <SelectItem value="daily">daily</SelectItem>
                <SelectItem value="monthly">monthly</SelectItem>
                <SelectItem value="yearly">yearly</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* <DropdownMenuItem
          onSelect={(e) => e.preventDefault()}
          className=" hover:!bg-transparent"
        >
        </DropdownMenuItem> */}
        <div className="flex flex-col gap-2 px-2 py-4" w-full>
          <span className="inline-block">Theo khoảng ngày</span>
          <DataTableFilterDateRange filterKey="period" title="Ngày" />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
