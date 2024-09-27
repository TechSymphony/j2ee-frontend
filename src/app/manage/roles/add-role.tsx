"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { CreateRoleBody, CreateRoleBodyType } from "@/schemas/role.schema";
import { toast } from "@/hooks/use-toast";
import {
  useAddRoleMutation,
  useGetPermissionListQuery,
} from "@/queries/useRole";
import { handleErrorFromApi } from "@/lib/utils";

export default function AddRole() {
  const [open, setOpen] = useState(false);

  const addRoleMutation = useAddRoleMutation();
  const getPermissonListQuery = useGetPermissionListQuery();
  const items = getPermissonListQuery.data?.payload;

  const form = useForm<CreateRoleBodyType>({
    resolver: zodResolver(CreateRoleBody),
    defaultValues: {
      name: "",
      description: "",
      permissions: [],
    },
  });

  const reset = () => {
    form.reset();
  };
  const onSubmit = async (values: CreateRoleBodyType) => {
    console.log(values);
    if (addRoleMutation.isPending) return;
    try {
      const result = await addRoleMutation.mutateAsync(values);
      console.log(result);
      toast({
        description: "Tạo vai trò thành công",
        duration: 5000,
      });
      reset();
      setOpen(false);
    } catch (error: any) {
      handleErrorFromApi({
        error,
        setError: form.setError,
        duration: 5000,
      });
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Tạo vai trò
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Tạo vai trò</DialogTitle>
          <DialogDescription>
            Các trường name, description là bắt buộc
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            className="grid auto-rows-max items-start gap-4 md:gap-8"
            id="add-role-form"
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
          <Button type="submit" form="add-role-form">
            Thêm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
