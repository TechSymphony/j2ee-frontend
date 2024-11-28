"use client";
import { ReactNode } from "react";
import { useAuthorize } from "@/components/authorization/use-authorization";
import Forbidden from "@/components/authorization/forbidden";
import Component from "@/app/loading";

export function RouteAuthorize({ children }: { children: ReactNode }) {
  const { isAuthorized, isLoading } = useAuthorize();
  if (isLoading) {
    return <Component />;
  }
  if (!isAuthorized) {
    return <Forbidden />;
  }

  return children;
}
