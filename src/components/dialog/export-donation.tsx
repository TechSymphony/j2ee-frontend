import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { useRef } from "react";
import { useGetCampaignListQuery } from '../../queries/useCampaign';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FormControl } from "../ui/form";

const clickHandler = () => {
  const apiURL = process.env.NEXT_PUBLIC_API_ENDPOINT;
  // get student only checkbox by react

  const student_only = document.getElementById("student_only") as HTMLInputElement;

  let url;
  if (student_only.dataset.state === "checked") {
    url = `${apiURL}/donations/export?type=student_only`;
  } else {
    url = `${apiURL}/donations/export`;
  }

  fetch(url, {
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

    return (
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
          <div className="grid grid-cols-2 items-center gap-4">
            <Label htmlFor="campaign" className="text-right">
              Chọn chiến dịch
            </Label>
            <Select>
              <SelectTrigger>
                  <SelectValue placeholder="Chọn chiến dịch" />
              </SelectTrigger>
              <SelectContent>
                {items?.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name} (ID: {item.id})
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="student_only" className="text-right">
              Chỉ sinh viên
            </Label>
            <Checkbox 
            id="student_only"
            className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={clickHandler}>Xuất danh sách</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    )
}