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
        defaultValues: { // Set an empty object as the default value
            beneficiary: null,
            code: "",
            name: "",
            description: "",
            targetAmount: 0,
            currentAmount: 0,
            startDate: new Date(),
            endDate: new Date(),
            status: "WAITING",
        },
    });
    console.log("form", form.watch());
    /**
     * Description: Sử dụng useEffect để set giá trị tương ứng với update Campaign đã chọn vào form
     */
    useEffect(() => {
        if (initialData) {
            const { beneficiary, code, name, description, targetAmount, currentAmount, startDate, endDate, status } = initialData.payload;
            form.reset({
                beneficiary,
                code,
                name,
                description,
                targetAmount,
                currentAmount,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status,
            });
        }
    }, [initialData, form]);
    const onSubmit = async (data: UpdateCampaignBodyType | CreateCampaignBodyType) => {
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
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Trạng thái phê duyệt</FormLabel>
                                    <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        value={field.value || ''}
                                        disabled={!initialData}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn trạng thái" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="WAITING">Waiting</SelectItem>
                                            <SelectItem value="APPROVED">Approved</SelectItem>
                                            <SelectItem value="REJECT">Reject</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* {form.getValues("beneficiary") !== null && (
                            <FormField
                                control={form.control}
                                name="beneficiary"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Người thụ hưởng</FormLabel>
                                        <Select
                                            onValueChange={(value) => {
                                                const selectedBeneficiary = items?.content?.find(item => item.id === Number(value));
                                                console.log("selectedBeneficiary", selectedBeneficiary);
                                                field.onChange(selectedBeneficiary);
                                            }}
                                            value={field.value?.id?.toString() || ''}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn người thụ hưởng" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {items?.content?.map((item) => (
                                                    <SelectItem key={item.id} value={item.id.toString()}>
                                                        {item.user.fullName}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )} */}

                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form >
        </>
    );
};