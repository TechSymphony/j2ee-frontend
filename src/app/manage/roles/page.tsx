import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import RoleTable from "@/app/manage/roles/role-table";
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="space-y-2">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Vai trò</CardTitle>
            <CardDescription>Quản lý vai trò</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense>
              <RoleTable />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
