'use client';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    situationDetail: z.string().min(10),
    supportReceived: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
        message: "Expected number, received a string"
      })
})

type BeneficiaryFormValues = z.infer<typeof formSchema>

export default function BeneficiaryForm() {

    const apiURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

    const [loading, setLoading] = useState(false);

    const form = useForm<BeneficiaryFormValues>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (data: BeneficiaryFormValues) => {
        console.log(true);
        
        fetch(`${apiURL}/beneficiaries`, {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                situationDetail: data.situationDetail,
                supportReceived: data.supportReceived
            })
        }).then(res => res.json())
        .then(res => console.log(res))
    }

    return <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} 
                name="situationDetail"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Chi tiết tình trạng cần hỗ trợ</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Chi tiết tình trạng cần hỗ trợ" disabled={loading} {...field}></Input>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
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