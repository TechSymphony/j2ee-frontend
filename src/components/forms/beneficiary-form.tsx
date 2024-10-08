import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    situationDetail: z.string().min(10),
    supportReceived: z.number().min(10000)
})

type BeneficiaryFormValues = z.infer<typeof formSchema>

export default function BeneficiaryForm() {

    const [loading, setLoading] = useState(false);

    const form = useForm<BeneficiaryFormValues>({
        resolver: zodResolver(formSchema)
    })

    return <>
        <Form {...form}>
            <FormField control={form.control} 
            name="supportReceived"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Số tiền dự kiến</FormLabel>
                <FormControl>
                    <Input type="number" placeholder="Nhập số tiền dự kiến" disabled={loading} {...field} ></Input>
                </FormControl>
            </FormItem>
            )} />

            <Button disabled={loading} className="ml-auto w-full" type="submit">
                Gửi
            </Button>
        </Form>
    </>
}