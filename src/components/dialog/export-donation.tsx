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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  campaign: z.string(),
  student_only: z.optional(z.boolean())
});

type ExportDonationFormValues = z.infer<typeof formSchema>;

const onSubmit = async (data: ExportDonationFormValues) => {
  const apiURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
  // get student only checkbox by react

  const student_only = data.student_only;
  const campaignId = data.campaign;

  let url;
  if (student_only) {
    url = `${apiURL}/donations/export?type=student_only&`;
  } else {
    url = `${apiURL}/donations/export?`;
  }

  console.log(url + new URLSearchParams({
    campaign_id: campaignId
  }));

  fetch(url + new URLSearchParams({
    campaign_id: campaignId
  }).toString(), {
    method: "GET",
    headers: {
      "Authorization": "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN
    }
  }).then(res => res.blob()).then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = "donation-list.pdf";
    a.click();
  }).catch(err => console.log(err));
}

export function ExportDonationDialog() {

  const getCampaignListQuery = useGetCampaignListQuery();
  const items = getCampaignListQuery.data?.payload.content;

  const form = useForm<ExportDonationFormValues>({
    resolver: zodResolver(formSchema),
  });

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
                  name="student_only"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Xuất danh sách chỉ sinh viên? </FormLabel>
                      <FormControl>
                        <Checkbox id="student_only" checked={field.value} required={false} onCheckedChange={field.onChange} />
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