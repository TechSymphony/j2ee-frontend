"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { CalendarDatePicker } from '@/components/date-picker';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
// import { Select } from "@/components/ui/select";
// Removed unused import
import { toast } from "@/hooks/use-toast";
import {
    useAddCampaignMutation,
    useGetBeneficiaryListQuery,
    useGetCampaignQuery,
    useUpdateCampaignMutation,
} from "@/queries/useCampaign";
import {
    CreateCampaignBody,
    UpdateCampaignBody,
    CreateCampaignBodyType,
    UpdateCampaignBodyType,
} from "@/schemas/campaign.schema";
import { handleErrorFromApi } from "@/lib/utils";
import { useRefetch } from "@/contexts/app-context";

export const CampaignForm = () => {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const updateCampaignId = Number(params.campaignId as string);

    /**
     * Description: Lấy chi tiết một Campaign
     * Note:
     * Tham số enabled mục đích để kiểm tra nếu có updateCampaignId (tức là đang edit Campaign), thì mới cho phép query
     * refetch() để khi update thành công thì refetch lại data cho đồng bộ
     */
    const { data: initialData, refetch } = useGetCampaignQuery({
        id: updateCampaignId as number,
        enabled: Boolean(updateCampaignId),
    });

    const updateCampaignMutation = useUpdateCampaignMutation();
    const addCampaignMutation = useAddCampaignMutation();
    const getBeneficiaryListQuery = useGetBeneficiaryListQuery();
    const items = getBeneficiaryListQuery.data?.payload;

    const { triggerRefetch } = useRefetch();

    const title = initialData ? "Edit Campaign" : "Create Campaign";
    const description = initialData ? "Edit a Campaign." : "Add a new Campaign";
    const action = initialData ? "Save changes" : "Create";

    /**
     * Description: Khai báo type với schema validation cho form
     */
    type CampaignFormValuesType = typeof initialData extends true
        ? UpdateCampaignBodyType
        : CreateCampaignBodyType;
    const formSchema = initialData ? UpdateCampaignBody : CreateCampaignBody;

    const form = useForm<CampaignFormValuesType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            beneficiary_id: 0,
            code: "",
            targetAmount: 0,
            startDate: new Date(),
            endDate: new Date(),
            isApproved: false,
        },
    });

    /**
     * Description: Sử dụng useEffect để set giá trị tương ứng với update Campaign đã chọn vào form
     */
    useEffect(() => {
        if (initialData) {
            const { name, description, beneficiary_id, code, targetAmount, startDate, endDate, isApproved } = initialData.payload;
            form.reset({
                name,
                description,
                beneficiary_id,
                code,
                targetAmount,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                isApproved,
            });
        }
    }, [initialData, form]);


    const onSubmit = async (data: UpdateCampaignBodyType | CreateCampaignBodyType) => {
        console.log("data", data);
        try {
            setLoading(true);
            if (initialData) {
                const body: UpdateCampaignBodyType & { id: number } = {
                    id: updateCampaignId as number,
                    ...data,
                };
                await updateCampaignMutation.mutateAsync(body);
                toast({
                    description: "Cập nhật chiến dịch thành công",
                });
                triggerRefetch();
                refetch();
            } else {
                await addCampaignMutation.mutateAsync(data as CreateCampaignBodyType);
                toast({
                    description: "Tạo chiến dịch thành công",
                    duration: 5000,
                });
            }
            triggerRefetch();
            router.push(`/dashboard/campaign`);
        } catch (error: any) {
            handleErrorFromApi({ error, setError: form.setError });
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    <div className="gap-8 md:grid md:grid-cols-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">Tên</FormLabel>
                                    <FormControl>
                                        <Input id="name" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="description">Mô tả</FormLabel>
                                    <FormControl>
                                        <Input id="description" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="code">Mã chiến dịch</FormLabel>
                                    <FormControl>
                                        <Input id="code" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
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
                                        disabled={loading}
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
                                        disabled={loading}
                                        value={new Date(field.value)}
                                        onChange={(date) => field.onChange(date)}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="targetAmount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="target_amount">Mục tiêu</FormLabel>
                                    <FormControl>
                                        <Input
                                            id="target_amount"
                                            disabled={loading}
                                            {...field}
                                            onChange={(e) => field.onChange(Number(e.target.value))}
                                            type="number"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="isApproved"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Trạng thái</FormLabel>
                                    <Select
                                        onValueChange={(value) => field.onChange(value === 'true')}
                                        value={field.value ? 'true' : 'false'}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="false">Đang chờ duyệt</SelectItem>
                                            <SelectItem value="true">Được duyệt</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="beneficiary_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Người nhận</FormLabel>
                                    <Select
                                        onValueChange={(value) => field.onChange(Number(value))}
                                        value={String(field.value)}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Vui lòng chọn người hưởng thụ" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {items &&
                                                items.map((item) => (
                                                    <SelectItem key={item.id} value={String(item.id)}>
                                                        {item.situationDetail}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form >
        </>
    );
};