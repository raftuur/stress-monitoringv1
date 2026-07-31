"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { User } from "@/types/user";
import { useDeleteUser } from "@/hooks/useUsers";

interface Props {
  user: User;
}

export function DeleteUserDialog({
  user,
}: Props) {
  const [open, setOpen] = useState(false);

  const deleteMutation = useDeleteUser();

  async function handleDelete() {
    try {
      await deleteMutation.mutateAsync(user.id);

      toast.success("User deleted successfully");

      setOpen(false);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.detail ??
        "Delete failed"
      );
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger
        render={
          <Button
            variant="destructive"
            size="sm"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        }
      />

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Delete User
          </DialogTitle>
        </DialogHeader>

        <p>
          Delete user <b>{user.name}</b>?
        </p>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}