"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import React from "react";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ChangePasswordBody,
  ChangePasswordBodyType,
} from "@/schemas/user.schema";
import { toast } from "@/hooks/use-toast";
import { handleErrorFromApi } from "@/lib/utils";
import { useChangePasswordMutation } from "@/queries/useUser";

export default function ChangePassword() {
  const form = useForm<ChangePasswordBodyType>({
    resolver: zodResolver(ChangePasswordBody),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const changePasswordMutation = useChangePasswordMutation();

  const onSubmit = async (values: ChangePasswordBodyType) => {
    if (changePasswordMutation.isPending) return;
    try {
      await changePasswordMutation.mutateAsync(values);
      toast({
        description: "Cập nhật mật khẩu thành công",
      });
      form.reset();
    } catch (error) {
      handleErrorFromApi({
        error,
        setError: form.setError,
      });
    }
  };
  return (
    <div className="rounded-lg bg-white px-5 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Đổi mật khẩu
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Thay đổi mật khẩu để bảo mật tài khoản
        </div>
      </div>
      <Form {...form}>
        <form
          noValidate
          //   className="grid auto-rows-max items-start gap-4 md:gap-8"
          className="w-full"
          id="change-password-form"
          onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
        >
          <div className="grid gap-6 py-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                    <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                    <div className="col-span-3 w-full space-y-2">
                      <Input
                        id="currentPassword"
                        type="password"
                        className="w-full"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                    <Label htmlFor="newPassword">Mật khẩu mới</Label>
                    <div className="col-span-3 w-full space-y-2">
                      <Input
                        id="newPassword"
                        type="password"
                        className="w-full"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                    <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
                    <div className="col-span-3 w-full space-y-2">
                      <Input
                        id="confirmPassword"
                        type="password"
                        className="w-full"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />

            <Button
              disabled={changePasswordMutation.isPending}
              className="ml-auto text-xs bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Cập nhật
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
