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
import { toast } from "@/hooks/use-toast";
import {
    useAddCampaignMutation,
    useGetCampaignQuery,
    useUpdateCampaignMutation,
} from "@/queries/useCampaign";
import { useGetCategoryMenus } from "@/queries/useCategory";
import {
    CreateCampaignBody,
    UpdateCampaignBody,
    CreateCampaignBodyType,
    UpdateCampaignBodyType,
} from "@/schemas/campaign.schema";
import { handleErrorFromApi } from "@/lib/utils";
import { useRefetch } from "@/contexts/app-context";
import { ReviewStatusEnum, ReviewStatusOptions } from "@/types/enum";

export const CampaignForm = () => {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Get category list
    const { data: fetchCategoryList } = useGetCategoryMenus();
    const categories = fetchCategoryList?.payload;

    const updateCampaignId = Number(params.campaignId as string);

    const { data: initialData, refetch } = useGetCampaignQuery({
        id: updateCampaignId as number,
        enabled: Boolean(updateCampaignId),
    });

    const updateCampaignMutation = useUpdateCampaignMutation();
    const addCampaignMutation = useAddCampaignMutation();

    const { triggerRefetch } = useRefetch();

    const title = initialData ? "Chỉnh sửa chiến dịch" : "Tạo chiến dịch";
    const description = initialData ? "Chỉnh sửa một chiến dịch." : "Thêm một chiến dịch mới.";
    const action = initialData ? "Lưu thay đổi" : "Tạo mới";

    type CampaignFormValuesType = typeof initialData extends true
        ? UpdateCampaignBodyType
        : CreateCampaignBodyType;
    const formSchema = initialData ? UpdateCampaignBody : CreateCampaignBody;


    const form = useForm<CampaignFormValuesType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            beneficiary: null,
            category: {},
            code: "",
            name: "",
            description: "",
            targetAmount: 0,
            currentAmount: 0,
            startDate: new Date(),
            endDate: new Date(),
            status: ReviewStatusEnum.WAITING,
        },
    });

    console.log("check form", form.getValues());
    useEffect(() => {
        if (initialData) {
            const { beneficiary, category, code, name, description, targetAmount, currentAmount, startDate, endDate, status } = initialData.payload;
            form.reset({
                beneficiary,
                category,
                code,
                name,
                description,
                targetAmount,
                currentAmount,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status: ReviewStatusEnum[status as keyof typeof ReviewStatusEnum],
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
                await refetch();
                triggerRefetch();
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
            console.error("API Error:", error);
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
                                        onValueChange={(value) => field.onChange(Number(value))}
                                        value={field.value.toString() || ''}
                                        disabled={!initialData}
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
                                                <SelectValue placeholder="Chọn loại chiến dịch" >
                                                    {field.value?.name || "Chọn loại chiến dịch"}
                                                </SelectValue>
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
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};