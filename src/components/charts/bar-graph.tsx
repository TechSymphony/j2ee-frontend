"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DataTableFilterDateRange } from "@/components/ui/table/data-table-filter-date";
import { useGetDonationStatisQuery } from "@/queries/useDonation";
import useQueryConfig from "@/components/tables/donation-tables/donation-query-table";
import {
  endOfDay,
  endOfMonth,
  endOfYear,
  format,
  parse,
  startOfDay,
  startOfMonth,
  startOfYear,
} from "date-fns";
import { useRouter } from "next/navigation";

import { DataTableResetFilter } from "@/components/ui/table/data-table-reset-filter";
import {
  DataTableComponentProps,
  DataTableComponentType,
} from "@/components/ui/table/data-table-factory-filter";
import {
  DataTableFilterBox,
  DataTableFilterBoxProps,
} from "@/components/ui/table/data-table-filter-box";
import {
  DataTableFilterSelect,
  DataTableSelectProps,
} from "@/components/ui/table/data-table-select";
import { StatisEnum, StatisTypeOptions } from "@/types/enum";
import { useGetCampaignOptionsQuery } from "@/queries/useCampaign";

const chartConfig = {
  views: {
    label: "Tổng số tiền",
  },
  period: {
    label: "Period",
    color: "hsl(var(--chart-1))",
  },
  amountTotal: {
    label: "AmountTotal",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type PeriodType = "daily" | "monthly" | "yearly" | "invalid";

// interface Props {
//   filters?: DataTableComponentProps[];
// }

export function BarGraph() {
  const router = useRouter();
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("amountTotal");
  const queryConfig = useQueryConfig();
  const { data } = useGetDonationStatisQuery(queryConfig);
  const chartData = data?.payload as unknown as Record<
    string,
    string | number
  >[];
  console.log({ chartData });
  const { data: campaignListData } = useGetCampaignOptionsQuery();
  const campaigns = campaignListData?.payload;
  console.log({ campaigns });
  const campaignOptions = React.useMemo(() => {
    if (!campaigns) return [];
    return campaigns.map((campaign) => ({
      value: campaign.id,
      label: campaign.name,
    }));
  }, [campaigns]);
  console.log({ campaignOptions });
  const filters = [
    {
      type: DataTableComponentType.Select,
      props: {
        filterKey: "groupBy",
        title: "Loại thống kê",
        options: StatisTypeOptions,
        defaultValue: StatisEnum.MONTH,
      },
    },
    {
      type: DataTableComponentType.FilterDate,
      props: {
        filterKey: "period",
        title: "Khoảng ngày",
        // defaultValue: new Date(),
      },
    },
    {
      type: DataTableComponentType.Select,
      props: {
        filterKey: "campaignId",
        title: "Chiến dịch",
        options: campaignOptions,
      },
    },
  ];

  // console.log("chartdata", chartData);
  const renderFilters = (filters: DataTableComponentProps[]) => {
    const listNameFilters: string[] = [];
    const elements = filters.map((filter) => {
      switch (filter.type) {
        case DataTableComponentType.Select:
          listNameFilters.push(filter.props.filterKey);
          return (
            <DataTableFilterSelect
              key={filter.props.filterKey}
              {...(filter.props as DataTableSelectProps)}
            />
          );
        case DataTableComponentType.FilterDate:
          listNameFilters.push(`${filter.props.filterKey}_gt`);
          listNameFilters.push(`${filter.props.filterKey}_lt`);
          return (
            <DataTableFilterDateRange
              key={filter.props.filterKey}
              {...(filter.props as DataTableFilterBoxProps)}
            />
          );
        case DataTableComponentType.FilterBox:
          listNameFilters.push(filter.props.filterKey);
          return (
            <DataTableFilterBox
              key={filter.props.filterKey}
              {...(filter.props as DataTableFilterBoxProps)}
            />
          );
        default:
          throw new Error(`Unknown component type`);
      }
    });
    // console.log({ listNameFilters });
    elements.push(
      <DataTableResetFilter
        key={"reset-filter-data-table"}
        filters={listNameFilters}
      />
    );
    return elements;
  };

  const getPeriodType = (period: string): PeriodType => {
    if (/^\d{2}-\d{2}-\d{4}$/.test(period)) return "daily";
    if (/^\d{2}-\d{4}$/.test(period)) return "monthly";
    if (/^\d{4}$/.test(period)) return "yearly";
    return "invalid";
  };

  const formatDateResult = (period: string, start: Date, end: Date) => ({
    formattedStart: format(start, "dd-MM-yyyy"),
    formattedEnd: format(end, "dd-MM-yyyy"),
  });

  // Handler: Process daily period
  const handleDailyPeriod = React.useCallback((period: string) => {
    const date = parse(period, "dd-MM-yyyy", new Date());
    const start = startOfDay(date);
    const end = endOfDay(date);
    return formatDateResult(period, start, end);
  }, []);

  // Handler: Process monthly period

  const handleMonthlyPeriod = React.useCallback((period: string) => {
    const [month, year] = period.split("-");
    const date = parse(`${month}-${year}`, "MM-yyyy", new Date());
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return formatDateResult(period, start, end);
  }, []);

  // Handler: Process yearly period
  const handleYearlyPeriod = React.useCallback((period: string) => {
    const year = parseInt(period, 10);
    const start = startOfYear(new Date(year, 0));
    const end = endOfYear(new Date(year, 0));
    return formatDateResult(period, start, end);
  }, []);

  const handleBarClick = React.useCallback(
    (e: any) => {
      const { period } = e.payload;

      const periodType = getPeriodType(period);

      let result;

      switch (periodType) {
        case "daily":
          result = handleDailyPeriod(period);
          break;
        case "monthly":
          result = handleMonthlyPeriod(period);
          console.log({ result });
          break;
        case "yearly":
          result = handleYearlyPeriod(period);
          break;
        default:
          console.error("Invalid period format");
          return;
      }

      // console.log("Formatted period result:", result);
      router.push(
        `dashboard/donation?donationDate_gt=${result.formattedStart}&donationDate_lt=${result.formattedEnd}`
      );
    },
    [handleDailyPeriod, handleMonthlyPeriod, handleYearlyPeriod, router]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-col">
          <div className="flex flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>
              Thống kê các quyên góp dựa theo khoảng thời gian và chiến dịch
            </CardTitle>
            <CardDescription>
              Hiển thị các quyên góp theo năm hiện tại
            </CardDescription>
          </div>
          <div className="flex flex-1 items-center justify-start gap-2 px-6 pb-5 sm:pb-6">
            {filters?.length ? renderFilters(filters) : ""}
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          {chartData && chartData.length > 0 ? (
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="period"
                // dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
              />
              <YAxis
                dataKey="amountTotal"
                // dataKey="desktop"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                // unit={" VND"}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent className="w-[150px]" nameKey="views" />
                }
              />
              <Bar
                dataKey={activeChart}
                onClick={handleBarClick}
                className="cursor-pointer"
                fill={`var(--color-${activeChart})`}
              />
            </BarChart>
          ) : (
            <p className="flex items-center justify-center text-lg font-bold">
              Không có dữ liệu hiển thị
            </p>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
