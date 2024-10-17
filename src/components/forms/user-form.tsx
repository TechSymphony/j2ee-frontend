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
    useAddUserMutation,
    useGetBeneficiaryListQuery,
    useGetUserQuery,
    useUpdateUserMutation,
} from "@/queries/useUser";
import {
    CreateUserBody,
    UpdateUserBody,
    CreateUserBodyType,
    UpdateUserBodyType,
} from "@/schemas/user.schema";
import { handleErrorFromApi } from "@/lib/utils";
import { useRefetch } from "@/contexts/app-context";

export const UserForm = () => {
    const params = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const updateUserId = Number(params.userId as string);

    /**
     * Description: Lấy chi tiết một User
     * Note:
     * Tham số enabled mục đích để kiểm tra nếu có updateUserId (tức là đang edit User), thì mới cho phép query
     * refetch() để khi update thành công thì refetch lại data cho đồng bộ
     */
    const { data: initialData, refetch } = useGetUserQuery({
        id: updateUserId as number,
        enabled: Boolean(updateUserId),
    });

    const updateUserMutation = useUpdateUserMutation();
    const addUserMutation = useAddUserMutation();
    const getBeneficiaryListQuery = useGetBeneficiaryListQuery();
    const items = getBeneficiaryListQuery.data?.payload;

    const { triggerRefetch } = useRefetch();

    const title = initialData ? "Edit User" : "Create User";
    const description = initialData ? "Edit a User." : "Add a new User";
    const action = initialData ? "Save changes" : "Create";

    /**
     * Description: Khai báo type với schema validation cho form
     */
    type UserFormValuesType = typeof initialData extends true
        ? UpdateUserBodyType
        : CreateUserBodyType;
    const formSchema = initialData ? UpdateUserBody : CreateUserBody;

    const form = useForm<UserFormValuesType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: {},
            fullName: "",
            email: "",
            phone: "",
            password: "",

        },
    });

    /**
     * Description: Sử dụng useEffect để set giá trị tương ứng với update User đã chọn vào form
     */
    useEffect(() => {
        if (initialData) {
            const { role, fullName, email, phone, password } = initialData.payload;
            form.reset({
                role,
                fullName,
                email,
                phone,
                password,
            });
        }
    }, [initialData, form]);

    console.log("Form: ", form.watch());

    const onSubmit = async (data: UpdateUserBodyType | CreateUserBodyType) => {
        console.log("data", data);
        try {
            setLoading(true);
            if (initialData) {
                const body: UpdateUserBodyType & { id: number } = {
                    id: updateUserId as number,
                    ...data,
                };
                await updateUserMutation.mutateAsync(body);
                toast({
                    description: "Cập nhật người dùng thành công",
                });
                triggerRefetch();
                refetch();
            } else {
                await addUserMutation.mutateAsync(data as CreateUserBodyType);
                toast({
                    description: "Tạo người dùng thành công",
                    duration: 5000,
                });
            }
            triggerRefetch();
            router.push(`/dashboard/user`);
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
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="fullName">Họ và Tên</FormLabel>
                                    <FormControl>
                                        <Input id="fullName" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Mô tả</FormLabel>
                                    <FormControl>
                                        <Input id="email" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
                                    <FormControl>
                                        <Input id="phone" disabled={loading} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                                    <CalendarDatePicker
                                        id="password"
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
                            name="beneficiary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Người thụ hưởng</FormLabel>
                                    <Select
                                        onValueChange={(value) => {
                                            const selectedBeneficiary = items?.find(item => item.id === Number(value));
                                            field.onChange(selectedBeneficiary); // Cập nhật giá trị object của beneficiary
                                        }}
                                        value={field.value?.id?.toString() || ''}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Chọn người thụ hưởng" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {items?.map((item) => (
                                                <SelectItem key={item.id} value={item.id.toString()}>
                                                    {item.situationDetail} (ID: {item.id})
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