import { UserListResType } from "@/schemas/user.schema";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckIcon, X } from "lucide-react";

// Define the types for the user data

// Define the props for UserTableDialog, which accepts a list of users
interface UserImportedTableDialogProps {
  users: UserListResType;
  setOpen: (open: boolean) => void;
  open: boolean;
}

const UserImportedTableDialog: React.FC<UserImportedTableDialogProps> = ({
  users,
  setOpen,
}) => {
  return <div></div>;
};

export default UserImportedTableDialog;
