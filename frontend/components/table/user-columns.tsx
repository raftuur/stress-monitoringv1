"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types/user";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { UserDialog } from "@/components/users/UserDialog";
import { DeleteUserDialog } from "@/components/users/DeleteUserDialog";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex gap-2">
          <UserDialog
            mode="edit"
            user={user}
          />

          <DeleteUserDialog
            user={user}
          />
        </div>
      );
    },
  },
];