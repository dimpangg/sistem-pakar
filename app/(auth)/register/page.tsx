// "use client";
import { buttonVariants, RegisterForm } from "@/components";
import { cn } from "@/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Register = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <section className="w-full">
      <Link
        href="/"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "mb-4"
        )}
      >
        <ChevronLeft className="mr-2 h-5 w-5" /> Kembali
      </Link>
      <div className="mb-4 text-h4">Daftar</div>
      <RegisterForm searchParams={searchParams} />
    </section>
  );
};

export default Register;
