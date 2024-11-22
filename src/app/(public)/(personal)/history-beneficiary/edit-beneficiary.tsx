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
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { handleErrorFromApi } from "@/lib/utils";
import {
  UpdateMyBeneficiaryBody,
  UpdateMyBeneficiaryBodyType,
} from "@/schemas/beneficiary.schema";
import {
  useGetBeneficiaryQuery,
  useUpdateMyBeneficiaryMutation,
} from "@/queries/useBeneficiary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReviewStatusEnum, ReviewStatusOptions } from "@/types/enum";
import { toast } from "@/hooks/use-toast";

export default function EditBeneficiary({
  id,
  setId,
}: {
  id?: number | undefined;
  setId: Dispatch<SetStateAction<number | undefined>>;
}) {
  const { data, refetch } = useGetBeneficiaryQuery({
    id: id as number,
    enabled: Boolean(id),
  });

  const updateMyBeneficiaryMutation = useUpdateMyBeneficiaryMutation();

  const form = useForm<UpdateMyBeneficiaryBodyType>({
    resolver: zodResolver(UpdateMyBeneficiaryBody),
    defaultValues: {
      situationDetail: "",
      supportReceived: 0,
      verificationStatus: "0",
    },
  });

  useEffect(() => {
    if (data) {
      const { situationDetail, supportReceived, verificationStatus } =
        data.payload;
      form.reset({
        situationDetail,
        supportReceived,
        verificationStatus: ReviewStatusEnum[verificationStatus].toString(),
      });
    }
  }, [data, form]);

  const onSubmit = async (values: UpdateMyBeneficiaryBodyType) => {
    if (updateMyBeneficiaryMutation.isPending) return;
    try {
      // console.log("check values", values);
      await updateMyBeneficiaryMutation.mutateAsync({
        id: id as number,
        body: values,
      });
      toast({
        description: "Cập nhật nguyện vọng thành công",
      });
      setId(undefined);
      refetch();
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
          setId(undefined);
        }
      }}
    >
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle>Cập nhật nguyện vọng</DialogTitle>
          <DialogDescription>
            Các trường tên, email, mật khẩu là bắt buộc
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            noValidate
            className="grid auto-rows-max items-start gap-4 md:gap-8"
            id="edit-employee-form"
            onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
          >
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="situationDetail"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="name">Mô tả tình trạng cần hỗ trợ</Label>
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
                name="supportReceived"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label htmlFor="supportReceived">Số tiền dự kiến</Label>
                      <div className="col-span-3 w-full space-y-2">
                        <Input
                          id="supportReceived"
                          // disabled={loading}
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          type="number"
                        />
                        <FormMessage />
                      </div>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="verificationStatus"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid grid-cols-4 items-center justify-items-start gap-4">
                      <Label>Trạng thái phê duyệt</Label>
                      <div className="col-span-3 w-full space-y-2">
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value?.toString() || ""}
                          disabled={true}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn trạng thái" />
                          </SelectTrigger>
                          <SelectContent>
                            {ReviewStatusOptions.map((option) => (
                              <SelectItem
                                value={option.value.toString()}
                                key={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                            {/* <SelectItem value="0">Waiting</SelectItem>
                            <SelectItem value="1">Approved</SelectItem>
                            <SelectItem value="2">Reject</SelectItem> */}
                          </SelectContent>
                        </Select>
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
          <Button type="submit" form="edit-employee-form">
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
