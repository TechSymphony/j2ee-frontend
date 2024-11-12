"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";


interface Props {
    isOpenPopup: boolean;
    setIsOpenPopup: (isOpen: boolean) => void;
}

export default function Popup({ isOpenPopup, setIsOpenPopup }: Props) {
    const router = useRouter();

    return (
        <Dialog
            open={isOpenPopup}
            onOpenChange={setIsOpenPopup}
        >
            <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto" >
                <DialogHeader>
                    <DialogTitle>Thông báo</DialogTitle>
                    <DialogDescription className="text-sm">
                        Người hưởng thụ đã được duyệt, yêu cầu bạn tạo chiến dịch quyên góp mới để tiếp tục
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        className="text-xs md:text-sm"
                        onClick={() => router.push(`/dashboard/campaign/new`)}>
                        <Plus className="mr-2 h-4 w-4" /> Thêm mới
                    </Button>
                </DialogFooter>
                <DialogClose className="hidden" />
            </DialogContent>
        </Dialog >
    );
}
