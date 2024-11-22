import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { handleErrorFromApi } from "@/lib/utils";
import {
    CreateBeneficiaryBody,
    CreateBeneficiaryBodyType,
    UpdateMyBeneficiaryBody,
    UpdateMyBeneficiaryBodyType,
} from "@/schemas/beneficiary.schema";
import {
    useCreateBeneficiary,
    useGetBeneficiaryQuery,
    useUpdateMyBeneficiaryMutation,
} from "@/queries/useBeneficiary";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ReviewStatusEnum, ReviewStatusOptions } from "@/types/enum";
import { toast } from "@/hooks/use-toast";
import { useRefetch } from "@/contexts/app-context";
import QuillEditor from "@/components/ui/quill-editor";

interface BeneficiaryPopupProps {
    id?: number | undefined;
    setId: Dispatch<SetStateAction<number | undefined>>;
    mode: "create" | "edit" | "show";
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function BeneficiaryClientPopup({
    id,
    setId,
    mode,
    open,
    setOpen,
}: BeneficiaryPopupProps) {
    const { data, refetch } = useGetBeneficiaryQuery({
        id: id as number,
        enabled: Boolean(id),
    });

    const { triggerRefetch } = useRefetch();

    const createMyBeneficiaryMutation = useCreateBeneficiary();
    const updateMyBeneficiaryMutation = useUpdateMyBeneficiaryMutation();

    const form = useForm<CreateBeneficiaryBodyType | UpdateMyBeneficiaryBodyType>({
        resolver: zodResolver(
            mode === "create" ? CreateBeneficiaryBody : UpdateMyBeneficiaryBody
        ),
        defaultValues: {
            situationDetail: "",
            supportReceived: 0,
            verificationStatus: ReviewStatusEnum.WAITING,
        },
    });

    useEffect(() => {
        if (data && mode !== "create") {
            const { situationDetail, supportReceived, verificationStatus } =
                data.payload;
            form.reset({
                situationDetail,
                supportReceived,
                verificationStatus: ReviewStatusEnum[verificationStatus as keyof typeof ReviewStatusEnum],
            });
        }
    }, [data, form, mode]);

    const onSubmit = async (
        data: UpdateMyBeneficiaryBodyType | CreateBeneficiaryBodyType
    ) => {
        try {
            if (mode === "edit") {
                const body: UpdateMyBeneficiaryBodyType & { id: number } = {
                    id: id as number,
                    ...data,
                };
                await updateMyBeneficiaryMutation.mutateAsync({ id: body.id, body });
                toast({
                    description: "Cập nhật nguyện vọng thành công",
                });
                await refetch();
                triggerRefetch(); // Refetch the data table
            } else {
                const body: CreateBeneficiaryBodyType = {
                    ...data,
                    supportReceived: Number(data.supportReceived),
                };
                await createMyBeneficiaryMutation.mutateAsync(body);
                toast({
                    description: "Tạo nguyện vọng mới thành công",
                    duration: 5000,
                });
                triggerRefetch(); // Refetch the data table
            }
            setOpen(false)
            triggerRefetch();
        } catch (error: any) {
            console.error("API Error:", error);
            handleErrorFromApi({ error, setError: form.setError });
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!value) {
                    setId(undefined);
                    setOpen(false);
                }
            }}
        >
            <DialogContent className="sm:max-w-[850px] max-h-screen overflow-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === "create"
                            ? "Tạo nguyện vọng"
                            : mode === "edit"
                                ? "Cập nhật nguyện vọng"
                                : "Xem nguyện vọng"}
                    </DialogTitle>
                    <DialogDescription>
                        {mode !== "show" && "Các trường tên, email, mật khẩu là bắt buộc"}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        noValidate
                        className="grid auto-rows-max items-start gap-4 md:gap-8"
                        id="beneficiary-form"
                        onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
                    >
                        <div className="grid gap-4 py-4">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="situationDetail"
                                    render={({ field }) => (
                                        <FormItem>
                                            <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                                                <Label htmlFor="name">Mô tả tình trạng cần hỗ trợ</Label>
                                                <div className="col-span-3 w-full space-y-2">
                                                    <QuillEditor
                                                        value={field.value || ""}
                                                        onChange={field.onChange}
                                                        disabled={mode === "show"}
                                                    />
                                                    <FormMessage />
                                                </div>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="supportReceived"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                                            <Label htmlFor="supportReceived">Số tiền dự kiến</Label>
                                            <div className="col-span-3 w-full space-y-2">
                                                <Input
                                                    className="w-full"
                                                    id="supportReceived"
                                                    {...field}
                                                    onChange={(e) =>
                                                        field.onChange(Number(e.target.value))
                                                    }
                                                    type="number"
                                                    readOnly={mode === "show"}
                                                />
                                                <FormMessage />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="verificationStatus"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                                            <FormLabel>Trạng thái phê duyệt</FormLabel>
                                            <div className="col-span-3 w-full space-y-2">
                                                <Select
                                                    onValueChange={(value) => field.onChange(Number(value))}
                                                    value={field.value.toString() || ''}
                                                    disabled={true}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Chọn trạng thái" >
                                                                {ReviewStatusOptions.find(option => option.value === field.value)?.label || "Chọn trạng thái"}
                                                            </SelectValue>
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {ReviewStatusOptions.map(option => (
                                                            <SelectItem key={option.value} value={option.value.toString()}>
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </form>
                </Form>
                {mode !== "show" && (
                    <DialogFooter>
                        <Button type="submit" form="beneficiary-form">
                            {mode === "create" ? "Tạo mới" : "Lưu"}
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}