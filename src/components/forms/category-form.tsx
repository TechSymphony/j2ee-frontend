"use client";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { toast } from "@/hooks/use-toast";
import { handleErrorFromApi } from "@/lib/utils";
import { useRefetch } from "@/contexts/app-context";
import {
  useAddCategoryMutation,
  useGetCategoryMenus,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "@/queries/useCategory";
import {
  CreateCategoryBody,
  CreateCategoryBodyType,
  UpdateCategoryBody,
  UpdateCategoryBodyType,
} from "@/schemas/category.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CategoryForm = () => {
  const pathname = usePathname();
  console.log("pathname", pathname);
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const updateCategoryId = Number(params.categoryId as string);
  console.log(updateCategoryId);
  /**
   * Description: Lấy chi tiết một category
   * Note:
   * Tham số enabled mục đích để kiểm tra nếu có updateCategoryId (tức là đang edit role), thì mới cho phép query
   * refetch() để khi update thành công thì refetch lại data cho đồng bộ
   */
  const { data: initialData, refetch } = useGetCategoryQuery({
    id: updateCategoryId as number,
    enabled: Boolean(updateCategoryId),
  });
  /**
   * Description: Lấy danh sách category để đổ ra select box
   */
  const { data: fetchCategoryList } = useGetCategoryMenus();
  const categories = fetchCategoryList?.payload;
  const updateCategoryMutation = useUpdateCategoryMutation();
  const addCategoryMutation = useAddCategoryMutation();

  const { triggerRefetch } = useRefetch();

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category." : "Add a new category";
  const action = initialData ? "Save changes" : "Create";

  /**
   * Description: Khai báo type với schema validation cho form
   */
  type CategoryFormValuesType = typeof initialData extends true
    ? UpdateCategoryBodyType
    : CreateCategoryBodyType;
  const formSchema = initialData ? UpdateCategoryBody : CreateCategoryBody;

  const form = useForm<CategoryFormValuesType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      parent: null,
    },
  });

  /**
   * Description: Sử dụng useEffect để set giá trị tương ứng với update category đã chọn vào form
   */
  useEffect(() => {
    if (initialData) {
      const { name, parent } = initialData.payload;
      form.reset({
        name,
        parent,
      });
    }
  }, [initialData, form]);

  const onSubmit = async (
    data: UpdateCategoryBodyType | CreateCategoryBodyType
  ) => {
    try {
      setLoading(true);
      console.log(data);
      if (initialData) {
        const body: UpdateCategoryBodyType & { id: number } = {
          id: updateCategoryId as number,
          ...data,
        };
        await updateCategoryMutation.mutateAsync(body);
        toast({
          description: "Cập nhật danh mục thành công",
        });
        triggerRefetch();
        refetch();
      } else {
        await addCategoryMutation.mutateAsync(data as CreateCategoryBodyType);
        toast({
          description: "Tạo danh mục thành công",
          duration: 5000,
        });
      }
      triggerRefetch();
      router.push(`/dashboard/category`);
    } catch (error: any) {
      handleErrorFromApi({ error, setError: form.setError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Tên</FormLabel>
                  <FormControl>
                    <Input id="name" disabled={loading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parent"
              render={({ field }) => (
                <FormItem>
                  <div className="">
                    <FormLabel htmlFor="categories">Danh mục cha</FormLabel>

                    <Select
                      onValueChange={(value) => {
                        const selectedCategory = JSON.parse(value);
                        field.onChange(selectedCategory);
                      }}
                      defaultValue=""
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={
                            initialData
                              ? initialData.payload.parent?.name
                              : "Vui lòng chọn danh mục cha"
                          }>
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories && categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={JSON.stringify({
                              id: category.id,
                              name: category.name,
                            })}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
