"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
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
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
// import { Select } from "@/components/ui/select";
// Removed unused import
import { toast } from "@/hooks/use-toast";
import {
  useAddUserMutation,
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
import { useGetRoleOptionsQuery } from "@/queries/useRole";
import { Switch } from "../ui/switch";

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
  const getRoleListQuery = useGetRoleOptionsQuery();
  const items = getRoleListQuery.data?.payload ?? [];

  const { triggerRefetch } = useRefetch();

  const title = initialData
    ? "Chỉnh sửa thông tin người dùng"
    : "Thêm mới người dùng";
  const description = initialData
    ? "Chỉnh sửa thông tin người dùng"
    : "Thêm mới một người dùng";
  const action = initialData ? "Cập nhật" : "Thêm";

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
      role: null,
      fullName: "",
      email: "",
      phone: null,
    },
  });

  /**
   * Description: Sử dụng useEffect để set giá trị tương ứng với update User đã chọn vào form
   */
  useEffect(() => {
    if (initialData) {
      const { role, fullName, email, phone, enabled, isStudent } = initialData.payload;
      form.reset({
        role,
        fullName,
        email,
        phone,
        enabled,
        isStudent,
      });
    }
  }, [initialData, form]);

  console.log("form", form.getValues())

  const onSubmit = async (data: UpdateUserBodyType | CreateUserBodyType) => {
    try {
      setLoading(true);
      data.username = data.email;
      console.log("data", data);
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
                  <FormLabel htmlFor="email">Email</FormLabel>
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
                  <FormLabel htmlFor="phone">Số điện thoại <span className="text-xs text-red-600"> (*không bắt buộc)</span> </FormLabel>
                  <FormControl>
                    <Input id="phone" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vai trò <span className="text-xs text-red-600"> (*không bắt buộc)</span></FormLabel>
                  <Select
                    onValueChange={(value) => {
                      const selectedRole = items?.find(
                        (item) => item.id === Number(value)
                      );
                      field.onChange(selectedRole); // Cập nhật giá trị object của Role
                    }}
                    value={field.value?.id?.toString() || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn vai trò" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {items.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name}
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
              name="enabled"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">Trạng thái người dùng</FormLabel>
                  <FormControl>
                    <Switch className="bg-green-500 border-2 border-gray-300 rounded-full"
                      checked={field.value}
                      onCheckedChange={(value) => field.onChange(value)}
                      defaultChecked={true}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isStudent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="block">Là sinh viên</FormLabel>
                  <FormControl>
                    <Switch className="bg-green-500 border-2 border-gray-300 rounded-full"
                      checked={field.value}
                      onCheckedChange={(value) => field.onChange(value)}
                      defaultChecked={false}
                    />
                  </FormControl>
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
