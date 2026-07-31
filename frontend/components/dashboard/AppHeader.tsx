"use client";

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

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AppHeader() {
  const router = useRouter();

  function logout() {
    Cookies.remove("token");
    Cookies.remove("role");

    router.replace("/login");
  }

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">

      <div>
        <h1 className="text-xl font-semibold">
          Stress Monitoring
        </h1>
      </div>

      <DropdownMenu>

        <DropdownMenuTrigger>

          <Avatar className="cursor-pointer">

            <AvatarFallback>
              A
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
            onClick={logout}
            className="text-red-600"
          >
            Logout
          </DropdownMenuItem>

        </DropdownMenuContent>

      </DropdownMenu>

    </header>
  );
}