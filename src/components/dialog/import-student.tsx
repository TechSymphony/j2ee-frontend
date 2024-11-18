import { Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { ImportStudentBody, ImportStudentBodyType } from "@/schemas/user.schema";
import { useImportStudentMutation } from "@/queries/useUser";

export function ImportStudentDialog() {

  const form = useForm<ImportStudentBodyType>({
    resolver: zodResolver(ImportStudentBody),
  });

  const fileRef = form.register("file");

  const importStudentMutation = useImportStudentMutation();

  const onSubmit = async (data: ImportStudentBodyType) => {
    
    const element = document.getElementById("file") as HTMLInputElement;
    const file = element.files![0];
  
    const formData = new FormData();
    formData.append("file", file);
  
    console.log(formData);
    console.log(file);

    const res = await importStudentMutation.mutateAsync(data);
    console.log(res);
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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