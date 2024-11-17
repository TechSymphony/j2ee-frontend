"use client";
import { useEffect, useMemo, useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import {
  useAddRoleMutation,
  useGetPermissionListQuery,
  useGetRoleQuery,
  useUpdateRoleMutation,
} from "@/queries/useRole";
import {
  CreateRoleBody,
  UpdateRoleBody,
  CreateRoleBodyType,
  UpdateRoleBodyType,
} from "@/schemas/role.schema";
import { handleErrorFromApi } from "@/lib/utils";
import { useRefetch } from "@/contexts/app-context";

export const RoleForm = () => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateRoleId = Number(params.roleId as string);

  /**
   * Description: Lấy chi tiết một role
   * Note:
   * Tham số enabled mục đích để kiểm tra nếu có updateRoleId (tức là đang edit role), thì mới cho phép query
   * refetch() để khi update thành công thì refetch lại data cho đồng bộ
   */
  const { data: initialData, refetch } = useGetRoleQuery({
    id: updateRoleId as number,
    enabled: Boolean(updateRoleId),
  });

  const isEditAdminRole = useMemo(() => {
    return initialData?.payload.name === "admin";
  }, [initialData]);

  const updateRoleMutation = useUpdateRoleMutation();
  const addRoleMutation = useAddRoleMutation();
  const getPermissonListQuery = useGetPermissionListQuery();
  const items = getPermissonListQuery.data?.payload;

  const { triggerRefetch } = useRefetch();

  const title = initialData ? "Chỉnh sửa chức vụ" : "Tạo chức vụ";
  const description = initialData
    ? "Chỉnh sửa một chức vụ"
    : "Thêm một chức vụ mới";
  const action = initialData ? "Lưu thay đổi" : "Tạo mới";

  /**
   * Description: Khai báo type với schema validation cho form
   */
  type RoleFormValuesType = typeof initialData extends true
    ? UpdateRoleBodyType
    : CreateRoleBodyType;
  const formSchema = initialData ? UpdateRoleBody : CreateRoleBody;

  const form = useForm<RoleFormValuesType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  /**
   * Description: Sử dụng useEffect để set giá trị tương ứng với update role đã chọn vào form
   */
  useEffect(() => {
    if (initialData) {
      const { name, description, permissions } = initialData.payload;
      form.reset({
        name,
        description,
        permissions,
      });
    }
  }, [initialData, form]);

  const onSubmit = async (data: UpdateRoleBodyType | CreateRoleBodyType) => {
    try {
      setLoading(true);
      if (initialData) {
        const body: UpdateRoleBodyType & { id: number } = {
          id: updateRoleId as number,
          ...data,
        };
        await updateRoleMutation.mutateAsync(body);
        toast({
          description: "Cập nhật vai trò thành công",
        });
        triggerRefetch();
        refetch();
      } else {
        await addRoleMutation.mutateAsync(data as CreateRoleBodyType);
        toast({
          description: "Tạo vai trò thành công",
          duration: 5000,
        });
      }
      triggerRefetch();
      router.push(`/dashboard/role`);
    } catch (error: any) {
      handleErrorFromApi({ error, setError: form.setError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
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
                    <Input
                      id="name"
                      disabled={loading}
                      {...field}
                      readOnly={isEditAdminRole}
                    />
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
                    <Input
                      id="description"
                      disabled={loading}
                      {...field}
                      readOnly={isEditAdminRole}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="permissions"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-rows-4 items-center justify-items-start gap-2">
                    <FormLabel htmlFor="permissions">Quyền</FormLabel>
                    <FormControl>
                      <div className="row-span-3 w-full space-y-2">
                        {items &&
                          items.map((item) => (
                            <div
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <Checkbox
                                checked={field.value.some(
                                  (value) => value.id === item.id
                                )}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    // Nếu role được chọn => vào mảng
                                    field.onChange([...field.value, item]);
                                  } else {
                                    // Nếu bỏ chọn role => xóa khỏi mảng
                                    field.onChange(
                                      field.value.filter(
                                        (value) => value.id !== item.id
                                      )
                                    );
                                  }
                                }}
                                disabled={isEditAdminRole}
                              />

                              <FormLabel
                                className="font-normal"
                                style={{ color: "inherit" }} //Prevent adding color in <FormLabel> in Shadcn and React
                              >
                                {item.name}
                              </FormLabel>
                            </div>
                          ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </div>
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
