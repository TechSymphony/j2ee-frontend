import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { SVGProps } from "react";

interface Props {
  title?: string;
  icon?: React.ReactNode;
  value?: number;
}

export default function StatCard({ title, icon, value }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
      </CardContent>
    </Card>
  );
}
