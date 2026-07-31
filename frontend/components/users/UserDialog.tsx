"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

import { useCreateUser, useUpdateUser } from "@/hooks/useUsers";
import { User } from "@/types/user";

interface UserDialogProps {
  mode: "create" | "edit";
  user?: User;
}

export function UserDialog({
  mode,
  user,
}: UserDialogProps) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(
    user?.name ?? ""
  );

  const [email, setEmail] = useState(
    user?.email ?? ""
  );

  const [password, setPassword] = useState("");

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  async function handleSubmit() {
    try {
      if (mode === "create") {
        await createUser.mutateAsync({
          name,
          email,
          password,
          role: "ADMIN",
        });

        toast.success("User created successfully");
      } else {
        if (!user) return;

        await updateUser.mutateAsync({
          id: user.id,
          payload: {
            name,
            email,
            role: user.role,
            status: user.status,
          },
        });

        toast.success("User updated successfully");
      }

      setOpen(false);
    } catch (err: any) {
      toast.error(
        err?.response?.data?.detail ??
        "Something went wrong"
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
          mode === "create" ? (
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
            >
              Edit
            </Button>
          )
        }
      />

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Add User"
              : "Edit User"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={createUser.isPending || updateUser.isPending}
          >
            {createUser.isPending || updateUser.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}