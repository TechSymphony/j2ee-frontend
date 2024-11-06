'use client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useQuill } from 'react-quilljs';
import "quill/dist/quill.snow.css";

const formSchema = z.object({
    situationDetail: z.string(),
    supportReceived: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
    })
})

type BeneficiaryFormValues = z.infer<typeof formSchema>

const InitTextarea = function ({ form }) {
    const { quill, quillRef } = useQuill();

    const { setValue } = form;

    React.useEffect(() => {
        if (quill) {
            quill.on('text-change', () => {
                setValue("situationDetail", quill.getSemanticHTML());
            })
        }
    }, [quill]);

    return (
        <>
            <b id="editor-label"></b>
            <div id="editor">
                <div ref={quillRef} />
            </div>
        </>
    )
}

export default function BeneficiaryForm() {

    const apiURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

    const [loading, setLoading] = useState(false);

    const form = useForm<BeneficiaryFormValues>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (data: BeneficiaryFormValues) => {
        const input = document.querySelector('input[name="situationDetail"]')?.value;

        let situationDetail;
        if (input?.length < 10) {
            const label = document.querySelector("#editor-label");
            if (label)
                label.value = "Vui lòng nhập tối thiểu 10 ký tự";

            return false;
        } else situationDetail = input;

        fetch(`${apiURL}/beneficiaries`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                situationDetail: situationDetail,
                supportReceived: data.supportReceived
            })
        }).then(res => res.json())
            .then(res => {
                alert("Gửi thành công!");
                console.log(res)
            })
    }

    return <>
        <Form {...form}>
            <link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet" />
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control}
                    name="situationDetail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mô tả tình trạng cần hỗ trợ:</FormLabel>
                            <FormControl>
                                <Input type="hidden" disabled={loading} {...field}></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <InitTextarea form={form} />
                <FormField control={form.control}
                    name="supportReceived"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Số tiền dự kiến</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="Nhập số tiền dự kiến" disabled={loading} {...field}></Input>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                <Button disabled={loading} className="ml-auto w-full" type="submit">
                    Gửi
                </Button>
            </form>
        </Form>
    </>
}