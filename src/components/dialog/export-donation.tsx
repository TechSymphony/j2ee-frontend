"use client";
import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useGetCampaignListQuery } from '../../queries/useCampaign';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExportDonationBody, ExportDonationBodyType } from "@/schemas/donation.schema";
import { useExportDonationMutation } from "@/queries/useDonation";

export const ExportDonationDialog = () => {

  const getCampaignListQuery = useGetCampaignListQuery();
  const items = getCampaignListQuery.data?.payload.content;

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

    const res = await exportDonationList.mutateAsync(body);

    if (res?.payload) {
      const url = window.URL.createObjectURL(res?.payload);
      const a = document.createElement('a');
      a.href = url;
      a.download = "donation-list.pdf";
      a.click();
    }
  }
  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Xuất báo cáo</Button>
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
                              <SelectItem key={item.id} value={item.id.toString()}>
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
            </div>
            <div className="grid gap-4 py-4">
              <div className="">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xuất danh sách chỉ sinh viên? </FormLabel>
                      <FormControl>
                        <Checkbox id="type" required={false} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Xuất danh sách</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </form>
    </Form>
  )
}