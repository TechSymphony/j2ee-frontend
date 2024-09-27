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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UpdateRoleBody, UpdateRoleBodyType } from "@/schemas/role.schema";
import {
  useGetPermissionListQuery,
  useGetRoleQuery,
  useUpdateRoleMutation,
} from "@/queries/useRole";
import { useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { handleErrorFromApi } from "@/lib/utils";

export default function EditRole({
  id,
  setId,
  onSubmitSuccess,
}: {
  id?: number | undefined;
  setId: (value: number | undefined) => void;
  onSubmitSuccess?: () => void;
}) {
  const { data } = useGetRoleQuery({ id: id as number, enabled: Boolean(id) });
  const getPermissonListQuery = useGetPermissionListQuery();
  const items = getPermissonListQuery.data?.payload;
  const updateRoleMutation = useUpdateRoleMutation();
  const form = useForm<UpdateRoleBodyType>({
    resolver: zodResolver(UpdateRoleBody),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  useEffect(() => {
    if (data) {
      const { name, description, permissions } = data.payload;
      form.reset({
        name,
        description,
        permissions,
      });
    }
  }, [data, form]);

  const reset = () => {
    setId(undefined);
  };

  const onSubmit = async (values: UpdateRoleBodyType) => {
    if (updateRoleMutation.isPending) return;
    try {
      const body: UpdateRoleBodyType & { id: number } = {
        id: id as number,
        ...values,
      };

      await updateRoleMutation.mutateAsync(body);
      toast({
        description: "Cập nhật vai trò thành công",
      });
      reset();
      onSubmitSuccess && onSubmitSuccess();
    } catch (error) {
      handleErrorFromApi({
        error,
        setError: form.setError,
      });
    }
  };

  return (
    <Dialog
      open={Boolean(id)}
      onOpenChange={(value) => {
        if (!value) {
          reset();
        }
      }}
    >
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật vai trò</DialogTitle>
          <DialogDescription>
            Các trường tên, mô tả, mật khẩu là bắt buộc
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            className="grid auto-rows-max items-start gap-4 md:gap-8"
            id="edit-role-form"
            onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
          >
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="name">Tên</Label>
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
                name="permissions"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="permissions">Quyền</Label>
                      <div className="col-span-3 w-full space-y-2">
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
                              />

                              <FormLabel
                                className="font-normal"
                                style={{ color: "inherit" }} //Prevent adding color in <FormLabel> in Shadcn and React
                              >
                                {item.name}
                              </FormLabel>
                            </div>
                          ))}
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="edit-role-form">
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
