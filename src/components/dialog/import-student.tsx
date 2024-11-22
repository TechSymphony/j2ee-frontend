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
import { Input } from "../ui/input";
import {
  ImportStudentBody,
  ImportStudentBodyType,
  UserListResType,
} from "@/schemas/user.schema";
import { useImportStudentMutation } from "@/queries/useUser";
import { handleErrorFromApi } from "@/lib/utils";
import { useState } from "react";
import UserImportedTableDialog from "../tables/user-tables/user-imported-table-dialog";
import { CheckIcon, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Checkbox } from "../ui/checkbox";

export function ImportStudentDialog() {
  const [open, setOpen] = useState(false);
  const [openResultDialog, setOpenResultDialog] = useState(false);

  const form = useForm<ImportStudentBodyType>({
    resolver: zodResolver(ImportStudentBody),
  });

  const fileRef = form.register("file");

  const importStudentMutation = useImportStudentMutation();
  const [result, setResult] = useState<UserListResType>([]);

  const onSubmit = async (data: ImportStudentBodyType) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("isStudent", data.isStudent ? "true" : "false");
    try {
      const res = await importStudentMutation.mutateAsync(formData);

      if (res?.payload) {
        setOpen(false);
        setResult(res.payload);
        setOpenResultDialog(true);
      }
    } catch (error: any) {
      handleErrorFromApi({ error, setError: form.setError });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Dialog open={open} onOpenChange={setOpen}>
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
                <div className="">
                  <FormField
                    control={form.control}
                    name="isStudent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Là sinh viên? </FormLabel>
                        <FormControl>
                          <Checkbox
                            id="isStudent"
                            checked={field.value}
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
                  disabled={importStudentMutation.isPending}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  Nhập danh sách
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </Form>

      <Dialog open={openResultDialog} onOpenChange={setOpenResultDialog}>
        <DialogContent className="w-auto min-w-[50vw]" style={{ minWidth: "" }}>
          <DialogTitle>Danh sách tài khoản đã nhập thành công</DialogTitle>

          <div className="overflow-auto min-w-[300px]">
            {result && result.length > 0 ? (
              <Table className="mt-4 relative">
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Họ và Tên
                    </TableHead>
                    <TableHead className="w-[100px]">Email</TableHead>
                    <TableHead className="whitespace-nowrap">
                      Số điện thoại
                    </TableHead>
                    {/* <TableHead className="whitespace-nowrap">Vai trò</TableHead> */}
                    <TableHead className="whitespace-nowrap">
                      Tên đăng nhập
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      Học sinh
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      {/* <TableCell>{user?.role?.name}</TableCell> */}
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        {user.isStudent ? (
                          <CheckIcon className="text-green-500" />
                        ) : (
                          <X className="text-red-500" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              "Không có sinh viên nào đã nhập thêm vào hệ thống"
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
