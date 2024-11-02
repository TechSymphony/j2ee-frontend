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
import { Upload } from "lucide-react";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import {
  UpdateBasicUserBody,
  UpdateBasicUserBodyType,
} from "@/schemas/user.schema";
import { useGetMe, useUpdateMeMutation } from "@/queries/useUser";
import { toast } from "@/hooks/use-toast";
import { handleErrorFromApi } from "@/lib/utils";

interface Props {
  isOpenProfileForm: boolean;
  setIsOpenProfileForm: Dispatch<SetStateAction<boolean>>;
}

export default function ProfileForm({
  isOpenProfileForm,
  setIsOpenProfileForm,
}: Props) {
  const { data } = useGetMe();
  const updateMeMutation = useUpdateMeMutation();

  console.log("check user profile form", data);

  const form = useForm<UpdateBasicUserBodyType>({
    resolver: zodResolver(UpdateBasicUserBody),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (data) {
      const { fullName, email, phone } = data.payload;
      form.reset({
        fullName,
        email,
        phone,
      });
    }
  }, [data, form]);

  //   const reset = () => {
  //     setId(undefined);
  //     setFile(null);
  //   };

  const onSubmit = async (values: UpdateBasicUserBodyType) => {
    if (updateMeMutation.isPending) return;
    try {
      await updateMeMutation.mutateAsync(values);
      toast({
        description: "Cập nhật hồ sơ thành công",
      });
      setIsOpenProfileForm(false);
    } catch (error) {
      handleErrorFromApi({
        error,
        setError: form.setError,
      });
    }
  };

  return (
    <Dialog
      open={isOpenProfileForm}
      onOpenChange={(value) => {
        console.log("check dialog value", value);
        // if (!value) {
        //   reset();
        // }
        setIsOpenProfileForm(value);
      }}
    >
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật tài khoản</DialogTitle>
          <DialogDescription>
            Các trường tên, email, số điện thoại là bắt buộc
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            className="grid auto-rows-max items-start gap-4 md:gap-8"
            id="profile-form"
            onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
          >
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="name">Tên đầy đủ</Label>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="email">Email</Label>
                      <div className="col-span-3 w-full space-y-2">
                        <Input id="email" className="w-full" {...field} />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="name">Số điện thoại</Label>
                      <div className="col-span-3 w-full space-y-2">
                        <Input id="name" className="w-full" {...field} />
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
          <Button type="submit" form="profile-form">
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
