"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DonationType } from "@/schemas/donation.schema";
import { Eye, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import DonationDetailDialog from "@/components/tables/donation-tables/donation-detail-dialog";

interface CellActionProps {
  data: DonationType;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Hành động</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Eye className="mr-2 h-4 w-4" /> Hiển thị
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DonationDetailDialog
        open={open}
        onOpenChange={setOpen}
        donationId={data.id}
      />
    </>
  );
};
