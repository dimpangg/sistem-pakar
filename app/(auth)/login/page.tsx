import { buttonVariants, LoginForm, MushroomGills } from "@/components";
import { cn } from "@/utils";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="w-full px-4">
      <Link
        href="/"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          })
        )}
      >
        <ChevronLeft className="mr-2 h-5 w-5" /> Kembali
      </Link>

      <section className="my-10 flex flex-col items-center justify-center gap-2">
        <MushroomGills />
        <div className="text-h3">Selamat Datang</div>
        <div className="mb-4 text-muted-foreground">
          Silahkan masukkan email untuk melanjutkan
        </div>
        <LoginForm />
      </section>
    </div>
  );
};

export default Login;
