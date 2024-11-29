"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Checkbox } from "@/components/ui/checkbox";
import { UserType } from "@/schemas/user.schema";
import { useState } from "react";
import {
  useUpdateUserIsStudentMutation,
  useUpdateUserStatusMutation,
} from "@/queries/useUser";
import { Switch } from "@/components/ui/switch";

/**
 * Description: Khai báo columns cho table
 * Note:
 * accessorKey có value tương ứng với response data của api (phải ghi đúng để nó lấy được data ra)
 * header: Đơn giản chỉ là việc hiển thị tên column
 */
export const columns: ColumnDef<UserType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "fullName",
    header: "Họ tên",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Số điện thoại",
  },
  {
    accessorKey: "role.name",
    header: "Vai trò",
  },
  {
    accessorKey: "enabled",
    header: "Hoạt động",
    cell: ({ row }) => {
      const [enabled, setEnabled] = useState(row.original.enabled);
      const updateUserStatusMutation = useUpdateUserStatusMutation();

      const handleToggle = async () => {
        setEnabled(!enabled);

        await updateUserStatusMutation.mutateAsync({
          id: row.original.id,
          enabled: !enabled,
        });
      };

      return (
        <Switch
          className="bg-green-500 border-2 border-gray-300 rounded-full "
          checked={enabled}
          onCheckedChange={handleToggle}
        />
      );
    },
  },
  {
    accessorKey: "isStudent",
    header: "Sinh viên",
    cell: ({ row }) => {
      const [isStudent, setIsStudent] = useState(row.original.isStudent);
      const updateUserIsStudentMutation = useUpdateUserIsStudentMutation();

      const handleToggle = async () => {
        setIsStudent(!isStudent);

        await updateUserIsStudentMutation.mutateAsync({
          id: row.original.id,
          isStudent: !isStudent,
        });
      };

      return (
        <Switch
          className="bg-green-500 border-2 border-gray-300 rounded-full "
          checked={isStudent}
          onCheckedChange={handleToggle}
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
