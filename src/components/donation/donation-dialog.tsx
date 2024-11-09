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

export default function DonationDialog() {
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
                        Điền thông tin bên dưới để hoàn thành quyên góp của bạn.
                    </DialogDescription>
                </DialogHeader>

                <form className="space-y-4">
                    <div>
                        <Label htmlFor="amountTotal">Tổng số tiền</Label>
                        <Input
                            id="amountTotal"
                            type="number"
                            min="0.01"
                            placeholder="Nhập số tiền của bạn"
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="message">Lời nhắn</Label>
                        <Textarea
                            id="message"
                            maxLength={255}
                            placeholder="Nhập lời nhắn của bạn (tối đa 255 ký tự)"
                            required
                        />
                    </div>
                </form>

                <DialogFooter>
                    <Button
                        type="submit"
                        className="bg-pink-500 text-gray-100 hover:bg-pink-600"
                    >
                        Gửi quyên góp
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
