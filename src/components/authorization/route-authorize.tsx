"use client";
import { ReactNode } from "react";
import { useAuthorize } from "@/components/authorization/use-authorization";
import Forbidden from "@/components/authorization/forbidden";

export function RouteAuthorize({ children }: { children: ReactNode }) {
  const { isAuthorized } = useAuthorize();

  if (!isAuthorized) {
    return <Forbidden />;
  }

  return children;
}
