"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { CreateBeneficiaryBody, CreateBeneficiaryBodyType } from "@/schemas/beneficiary.schema";
import { useCreateBeneficiary } from "@/queries/useBeneficiary";
import { toast } from "@/hooks/use-toast";
import { handleErrorFromApi } from "@/lib/utils";
import { InitTextarea } from "./init-textarea";

export default function BeneficiaryForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateBeneficiaryBodyType>({
    resolver: zodResolver(CreateBeneficiaryBody),
  });

  const createBeneficiary = useCreateBeneficiary();

  const onSubmit = async (data: CreateBeneficiaryBodyType) => {
  
    try {
      setLoading(true);
      await createBeneficiary.mutateAsync(data);

      toast({
        title: "Thành công",
        description: "Tạo mới nguyện vọng thành công!",
        variant: "default",
      })
    } catch (error: any) {
      console.error("API Error:", error);
      handleErrorFromApi({ error, setError: form.setError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <link
          href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css"
          rel="stylesheet"
        />
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="my-6">
            <FormField
              control={form.control}
              name="situationDetail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả tình trạng cần hỗ trợ:</FormLabel>
                  <FormControl>
                    <Input type="hidden" disabled={loading} {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <InitTextarea form={form} field="situationDetail" />
          </div>
          <div className="mb-6">
            <FormField
              control={form.control}
              name="supportReceived"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số tiền dự kiến</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Nhập số tiền dự kiến"
                      disabled={loading}
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Gửi
          </Button>
        </form>
      </Form>
    </>
  );
}
