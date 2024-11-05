import categoryApi from "@/apis/category";
import { QueryConfig } from "@/hooks/useQueryConfig";
import { UpdateCategoryBodyType } from "@/schemas/category.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCategoryListQuery = (queryConfig?: QueryConfig) => {
  return useQuery({
    queryKey: ["categories", queryConfig],
    queryFn: categoryApi.getCategoryList,
    enabled: true,
  });
};

export const useGetCategoryMenus = () => {
  return useQuery({
    queryKey: ["category-menus"],
    queryFn: categoryApi.getCategoryMenuList,
    enabled: true,
  });
};

export const useGetCategoryQuery = ({
  id,
  enabled,
}: {
  id: number;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["category-detail", id],
    queryFn: () => categoryApi.getCategory(id),
    enabled,
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...body }: UpdateCategoryBodyType & { id: number }) =>
      categoryApi.updateCategory(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

export const useAddCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryApi.addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoryApi.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};
