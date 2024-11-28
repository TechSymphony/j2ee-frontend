import { BarGraph } from "@/components/charts/bar-graph";
import PageContainer from "@/components/layout/page-container";
import StatCard from "@/components/stat-card";

import {
  DataTableComponentProps,
  DataTableComponentType,
} from "@/components/ui/table/data-table-factory-filter";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { StatisTypeOptions } from "@/types/enum";

export default function page() {
  // const filters = [
  //   {
  //     type: DataTableComponentType.Select,
  //     props: {
  //       filterKey: "groupBy",
  //       title: "Loại thống kê",
  //       options: StatisTypeOptions,
  //     },
  //   },
  //   {
  //     type: DataTableComponentType.FilterDate,
  //     props: {
  //       filterKey: "period",
  //       title: "Khoảng ngày",
  //     },
  //   },
  //   {
  //     type: DataTableComponentType.FilterBox,
  //     props: {
  //       filterKey: "campaignId",
  //       title: "Chiến dịch",
  //       options: ,
  //     },
  //   },
  // ];
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        {/* title  */}
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight mb-4">
            Thống kê quyên góp
          </h2>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
              <div className="col-span-7">
                {/* <BarGraph filters={filters as DataTableComponentProps[]} /> */}
                <BarGraph />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}
