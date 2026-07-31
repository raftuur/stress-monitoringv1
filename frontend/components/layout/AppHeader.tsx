"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppHeader() {
  const router = useRouter();

  function logout() {
    Cookies.remove("token");
    Cookies.remove("role");

    router.replace("/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">

      <div>
        <h1 className="text-xl font-semibold">
          Stress Monitoring System
        </h1>

        <p className="text-sm text-muted-foreground">
          Dashboard Administrator
        </p>
      </div>

      <DropdownMenu>

        <DropdownMenuTrigger>

          <Avatar className="cursor-pointer">

            <AvatarFallback>
              AD
            </AvatarFallback>

          </Avatar>

        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">

          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>

          <DropdownMenuItem>
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-red-600"
            onClick={logout}
          >
            Logout
          </DropdownMenuItem>

        </DropdownMenuContent>

      </DropdownMenu>

    </header>
  );
}