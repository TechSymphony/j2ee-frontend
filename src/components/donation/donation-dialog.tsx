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
import { Textarea } from "@/components/ui/textarea";
import { useAddDonationMutation } from "@/queries/useDonation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormMessage } from "../ui/form";
import { FormItem } from "@/components/ui/form";
import {
    CreateDonationBody,
    CreateDonationBodyType,
} from "@/schemas/donation.schema";
import { toast } from "@/hooks/use-toast";

interface DonationDialogProps {
    campaignId: number;
}
export default function DonationDialog({ campaignId }: DonationDialogProps) {
    const addDonationMutation = useAddDonationMutation();
    const form = useForm<CreateDonationBodyType>({
        resolver: zodResolver(CreateDonationBody),
        defaultValues: {
            campaign: { id: campaignId },
            amountTotal: 0,
            message: "",
        },
    });

    const onSubmit = async (data: CreateDonationBodyType) => {
        const newDonation = await addDonationMutation.mutateAsync(data);
        const payURL = newDonation.payload.paymentUrl;
        if (payURL) {
            toast({
                description: "Tạo đơn từ thiện thành công",
                duration: 5000,
            });
            window.open(payURL);
        } else {
            toast({
                description:
                    "Có lỗi xảy ra, hãy làm mới trang và thực hiện lại thao tác ",
                duration: 5000,
            });
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-pink-500 text-gray-100 text-base hover:bg-pink-600">
                    Quyên góp
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Quyên góp</DialogTitle>
                    <DialogDescription>
                        Điền thông tin bên dưới để hoàn thành quyên góp.
                    </DialogDescription>
                </DialogHeader>
                <>
                    <Form {...form}>
                        <form
                            className="space-y-4"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="campaign"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        type="hidden"
                                                        id="campaign"
                                                        value={
                                                            field?.value?.id?.toString() ||
                                                            ""
                                                        }
                                                    ></Input>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        control={form.control}
                                        name="amountTotal"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label htmlFor="amountTotal">
                                                    Tổng số tiền
                                                </Label>
                                                <FormControl>
                                                    <Input
                                                        id="amountTotal"
                                                        type="number"
                                                        {...field}
                                                        placeholder="Nhập số tiền"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div>
                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label htmlFor="message">
                                                    Lời nhắn
                                                </Label>
                                                <FormControl>
                                                    <Textarea
                                                        {...field}
                                                        id="message"
                                                        placeholder="Nhập lời nhắn (tối đa 255 ký tự)"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    disabled={addDonationMutation.isPending}
                                    type="submit"
                                    className="bg-pink-500 text-gray-100 hover:bg-pink-600"
                                >
                                    Gửi quyên góp
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </>
            </DialogContent>
        </Dialog>
    );
}
