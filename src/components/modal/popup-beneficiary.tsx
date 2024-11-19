"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import {
    useAddCampaignMutation,
} from "@/queries/useCampaign";

import { useForm } from "react-hook-form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { CalendarDatePicker } from '@/components/date-picker';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateCampaignBody, CreateCampaignBodyType } from "@/schemas/campaign.schema";
import { ReviewStatusEnum, ReviewStatusOptions } from "@/types/enum";
import { toast } from "@/hooks/use-toast";
import { handleErrorFromApi } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { BeneficiaryType } from "@/schemas/beneficiary.schema";
import { useGetCategoryMenus } from "@/queries/useCategory";
import { useGetUserBeneficiaryQuery } from "@/queries/useBeneficiary";

interface Props {
    isOpenPopup: boolean;
    setIsOpenPopup: (isOpen: boolean) => void;
    beneficiary: BeneficiaryType;
    onCampaignCreation: (isSuccess: boolean) => void;
}

export default function PopupBeneficiary({ isOpenPopup, setIsOpenPopup, beneficiary, onCampaignCreation }: Props) {

    const addCampaignMutation = useAddCampaignMutation();
    const { data: fetchCategoryList } = useGetCategoryMenus();

    const categories = fetchCategoryList?.payload;

    console.log("categories", categories);
    const form = useForm<CreateCampaignBodyType>({
        resolver: zodResolver(CreateCampaignBody),
        defaultValues: {
            beneficiary: null,
            category: {},
            code: "",
            name: "",
            description: "",
            targetAmount: beneficiary?.supportReceived,
            currentAmount: 0,
            startDate: new Date(),
            endDate: new Date(),
            status: ReviewStatusEnum.WAITING,
            disabledAt: false,
        },
    });
    console.log("form", form.getValues());

    const { data: userBeneficiaryQuery } = useGetUserBeneficiaryQuery({ id: beneficiary?.user.id, enabled: true });
    const userBeneficiary = userBeneficiaryQuery?.payload;

    //số lượng chiến dịch đã được duyệt (approved) - số lượng chiến dịch đang chờ duyệt (waiting) - số lượng chiến dịch bị từ chối (rejected)
    const approvedCount = userBeneficiary ? userBeneficiary.filter(item => item.verificationStatus === "APPROVED").length : 0;
    const waitingCount = userBeneficiary ? userBeneficiary.filter(item => item.verificationStatus === "WAITING").length : 0;
    const rejectedCount = userBeneficiary ? userBeneficiary.filter(item => item.verificationStatus === "REJECT").length : 0;

    const onSubmit = async (values: CreateCampaignBodyType) => {
        if (addCampaignMutation.isPending) return;
        values.beneficiary = beneficiary; // Assign beneficiary to data before submitting
        try {
            await addCampaignMutation.mutateAsync(values as CreateCampaignBodyType);
            toast({
                description: "Tạo chiến dịch thành công",
                duration: 5000,
            });
            onCampaignCreation(true);
        } catch (error) {
            console.error("API Error:", error);
            handleErrorFromApi({ error, setError: form.setError });
            onCampaignCreation(false);
        }
    };

    return (
        <Dialog
            open={isOpenPopup}
            onOpenChange={setIsOpenPopup}
        >
            <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto" >
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Thông báo</DialogTitle>
                    <DialogDescription className="text-sm">
                        Người hưởng thụ đã được duyệt, yêu cầu bạn tạo chiến dịch quyên góp mới để tiếp tục
                    </DialogDescription>
                </DialogHeader>
                {beneficiary && userBeneficiary?.length !== 0 ? (
                    <div className="text-sm text-red-600 font-semibold">
                        *Người thụ hưởng này đã được tạo {approvedCount} chiến dịch
                    </div>
                ) : (
                    <div className="text-sm text-red-600 font-semibold">
                        *Người thụ hưởng này chưa tạo chiến dịch nào
                    </div>
                )}
                <div className="text-sm text-red-600 font-semibold">
                    - Số lượng mong muốn được hỗ trợ đang chờ: {waitingCount}
                </div>
                <div className="text-sm text-red-600 font-semibold">
                    - Số lượng mong muốn được hỗ trợ  bị từ chối: {rejectedCount}
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid auto-rows-max items-start gap-4 md:gap-8"
                    >
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                                            <Label htmlFor="name">Tên chiến dịch</Label>
                                            <div className="col-span-3 w-full space-y-2">
                                                <Input id="name" className="w-full" {...field} />
                                                <FormMessage />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                                            <Label htmlFor="description">Mô tả</Label>
                                            <div className="col-span-3 w-full space-y-2">
                                                <Input id="description" className="w-full" {...field} />
                                                <FormMessage />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                                            <Label htmlFor="code">Mã chiến dịch</Label>
                                            <div className="col-span-3 w-full space-y-2">
                                                <Input id="code" className="w-full" {...field} />
                                                <FormMessage />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="targetAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                                            <Label htmlFor="target_amount">Số tiền mục tiêu</Label>
                                            <div className="col-span-3 w-full space-y-2">
                                                <Input
                                                    id="target_amount"
                                                    {...field}
                                                    value={beneficiary?.supportReceived}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    type="number"
                                                    className="w-full"
                                                />
                                                <FormMessage />
                                            </div>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="start_date">Ngày bắt đầu</FormLabel>
                                        <CalendarDatePicker
                                            id="start_date"
                                            disabled={false}
                                            value={new Date(field.value)}
                                            onChange={(date) => field.onChange(date)}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel htmlFor="end_date">Ngày kết thúc</FormLabel>
                                        <CalendarDatePicker
                                            id="end_date"
                                            disabled={false}
                                            value={new Date(field.value)}
                                            onChange={(date) => field.onChange(date)}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Trạng thái phê duyệt</FormLabel>
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Loại chiến dịch</FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                const selectedBeneficiary = categories?.find(category => category.id === Number(value));
                                                field.onChange(selectedBeneficiary); // Cập nhật giá trị object của beneficiary
                                            }}
                                            value={field.value?.id?.toString() || ''}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn loại chiến dịch" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories?.map((category) => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>
                                                        {category.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button
                                className="text-xs md:text-sm"
                                type="submit">
                                <Plus className="mr-2 h-4 w-4" /> Thêm mới
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog >
    );
}