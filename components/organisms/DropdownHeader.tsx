"use client";
import { logout } from "@/services";
import { History, LogOut, Menu, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Doctor } from "../atoms";
import { Button } from "../molecules";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../molecules/DropdownMenuUI";

export function DropdownHeader() {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Menu size={24} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" alignOffset={10} className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              router.push("/system/profile");
            }}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push("/system/diagnose");
            }}
          >
            <Doctor className="mr-2 h-4 w-4 text-slate-900" />
            <span>Diagnosis</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push("/system/results");
            }}
          >
            <History className="mr-2 h-4 w-4" />
            <span>Riwayat Diagnosis</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            try {
              await logout();
              window.location.href = "/login";
            } catch (error) {
              throw new Error(JSON.stringify(error));
            }
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
