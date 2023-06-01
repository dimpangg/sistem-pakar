"use client";
import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../molecules";
import { DropdownHeader } from "./DropdownHeader";

const HeaderUser = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const noBackButton = pathname === "/system/diagnose";

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 bg-white text-primary transition-shadow duration-300 ease-in-out",
        scrolled ? "shadow-[0px_1px_20px_0px_#0000001A]" : ""
      )}
    >
      <div className="mx-auto flex w-full max-w-sm items-center justify-between bg-white px-0 py-[18px]">
        {noBackButton ? null : (
          <Button
            className={clsx(noBackButton && "invisible")}
            disabled={noBackButton}
            variant="ghost"
            onClick={() => router.back()}
            size="sm"
          >
            <ChevronLeft size={24} />
          </Button>
        )}
        <Link
          href="/system/diagnose"
          className={clsx("text-h4", noBackButton && "pl-4")}
        >
          Sistem Pakar
        </Link>
        <DropdownHeader />
      </div>
    </header>
  );
};

export default HeaderUser;
