import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";
import http from "@/lib/http";

function checkFileType(file: File) {
    console.log(file);
    console.log(file.name);
    if (file?.name) {
        const fileType = file.name.split(".").pop();
        console.log(fileType);
        if (fileType === "xlsx" || fileType === "xls") return true;
    }
    return false;
}

const formSchema = z.object({
    file: z.instanceof(FileList).optional(),
  });

type ImportStudentFormValues = z.infer<typeof formSchema>;

const onSubmit = async (data: z.infer<typeof formSchema>) => {

    console.log(data)
  
  const element = document.getElementById("file") as HTMLInputElement;
  const file = element.files![0];

  const formData = new FormData();
  formData.append("file", file);

  console.log(formData);
  
  
    console.log(file);

  http.post(`/users/import/student`, formData).then(res => {
    console.log(res);
  });

//   let url;
//   if (student_only) {
//     url = `${apiURL}/donations/export?type=student_only&`;
//   } else {
//     url = `${apiURL}/donations/export?`;
//   }
  


//   fetch(url + new URLSearchParams({
//     campaign_id: campaignId
//   }).toString(), {
//     method: "GET",
//     headers: {
//       "Authorization": "Bearer " + process.env.NEXT_PUBLIC_ACCESS_TOKEN
//     }
//   }).then(res => res.blob()).then(blob => {
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = "donation-list.pdf";
//     a.click();
//   }).catch(err => console.log(err));
}

export function ImportStudentDialog() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("file");

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} enctype="multipart/form-data">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Nhập danh sách sinh viên</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Nhập danh sách</DialogTitle>
              <DialogDescription>
                Nhập danh sách sinh viên vào hệ thống.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="">
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tệp tin cần nhập vào hệ thống</FormLabel>
                      <FormControl>
                        <Input id="file" type="file" {...fileRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Nhập danh sách</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </form>
    </Form>
  )
}