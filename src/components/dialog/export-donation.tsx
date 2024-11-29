"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  useGetCampaignListQuery,
  useGetCampaignOptionsQuery,
} from "../../queries/useCampaign";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExportDonationBody,
  ExportDonationBodyType,
} from "@/schemas/donation.schema";
import { useExportDonationMutation } from "@/queries/useDonation";
import { handleErrorFromApi } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { CalendarDatePicker } from "../date-picker";
import { FileDownIcon } from "lucide-react";

export const ExportDonationDialog = () => {
  const [open, setOpen] = useState(false);

  const getCampaignListQuery = useGetCampaignOptionsQuery();
  const items = getCampaignListQuery.data?.payload;

  const formSchema = ExportDonationBody;

  const form = useForm<ExportDonationBodyType>({
    resolver: zodResolver(formSchema),
  });

  const exportDonationList = useExportDonationMutation();

  const onSubmit = async (data: ExportDonationBodyType) => {
    // get student only checkbox by react

    const body: ExportDonationBodyType = {
      ...data,
    };

    try {
      const res = await exportDonationList.mutateAsync(body);
      if (res?.payload) {
        const blob = new Blob([res.payload], { type: "application/pdf" }); // Set the MIME type
        const url = window.URL.createObjectURL(blob);

        // Create an anchor element to trigger the download
        const a = document.createElement("a");
        a.href = url;
        a.download = "donation-list.pdf";

        // Append the anchor to the body (optional, but safer)
        document.body.appendChild(a);
        a.click();

        // Cleanup
        a.remove();
        window.URL.revokeObjectURL(url);

        toast({
          description: "Xuất danh sách thành công",
          duration: 5000,
        });
      }
    } catch (error: any) {
      handleErrorFromApi({ error, setError: form.setError });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <FileDownIcon className="mr-2 h-4 w-4" />
              Xuất báo cáo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Xuất báo cáo</DialogTitle>
              <DialogDescription>
                Xuất báo cáo người dùng đã quyên góp.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="">
                <FormField
                  control={form.control}
                  name="campaign"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chọn chiến dịch</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn chiến dịch" />
                          </SelectTrigger>
                          <SelectContent>
                            {items?.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Từ ngày</FormLabel>
                      <FormControl>
                        <CalendarDatePicker
                          value={
                            field.value
                              ? new Date(field.value)
                              : new Date(new Date().getFullYear(), 0, 1)
                          }
                          onChange={(date) => field.onChange(date)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="to"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đến ngày</FormLabel>
                      <FormControl>
                        <CalendarDatePicker
                          value={
                            field.value
                              ? new Date(field.value)
                              : new Date(new Date().getFullYear(), 11, 31)
                          }
                          onChange={(date) => field.onChange(date)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="studentOnly"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xuất danh sách theo sinh viên? </FormLabel>
                      <FormControl>
                        <Checkbox
                          id="type"
                          required={false}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="">
                <FormField
                  control={form.control}
                  name="isAnonymous"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Xuất danh sách bao gồm quyên góp ẩn danh?{" "}
                      </FormLabel>
                      <FormControl>
                        <Checkbox
                          id="type"
                          defaultChecked={true}
                          required={false}
                          onCheckedChange={field.onChange}
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
                type="submit"
                disabled={exportDonationList.isPending}
                onClick={form.handleSubmit(onSubmit)}
              >
                Xuất danh sách
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
};
