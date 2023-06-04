"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../molecules";
import { registerAccount } from "@/services";
import { useRouter } from "next/navigation";
import { Input } from "../molecules/Input";

const RegisterForm = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { email } = searchParams;
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const registerSchema = z
    .object({
      email: z
        .string()
        .nonempty("Email tidak boleh kosong")
        .email("Email tidak valid"),
      password: z.string().min(8, "Password minimal 8 karakter"),
      confirmPassword: z
        .string()
        .min(8, "Konfirmasi password minimal 8 karakter"),
      name: z.string().min(1, "Nama tidak boleh kosong"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password dan Konfirmasi Password tidak sama",
      path: ["confirmPassword"],
    });

  type RegisterFormType = z.infer<typeof registerSchema>;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<RegisterFormType>({
    defaultValues: {
      email: (email as string) || "",
      password: "",
      confirmPassword: "",
      name: "",
    },
    resolver: zodResolver(registerSchema),
  });
  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={async (e) => {
        e.preventDefault();
        await handleSubmit((data) => {
          setLoading(true);

          registerAccount({
            email: data.email,
            password: data.password,
            name: data.name,
          })
            .then(() => {
              router.push("/system/diagnose");
            })
            .catch((err) => {
              setLoading(false);
              if (err instanceof Response) {
                if (err.status === 422) {
                  setError("email", {
                    type: "manual",
                    message: "Email sudah terdaftar",
                  });
                } else {
                  setError("email", {
                    type: "manual",
                    message: "Terjadi kesalahan",
                  });
                }
              } else {
                setError("email", {
                  type: "manual",
                  message: "Terjadi kesalahan",
                });
              }
            });
        })();
      }}
    >
      <div>
        <label className="text-sm text-muted-foreground">Email</label>
        <Input
          type="email"
          {...register("email")}
          placeholder="contoh@email.com"
        />
        {errors.email && (
          <div className="mt-1 text-xs text-destructive">
            {errors.email.message}
          </div>
        )}
      </div>
      <div>
        <label className="text-sm text-muted-foreground">Nama</label>
        <Input type="text" {...register("name")} placeholder="Arif Rahman" />
        {errors.name && (
          <div className="mt-1 text-xs text-destructive">
            {errors.name.message}
          </div>
        )}
      </div>
      <div>
        <label className="text-sm text-muted-foreground">Password</label>
        <Input type="password" {...register("password")} eye />
        {errors.password && (
          <div className="mt-1 text-xs text-destructive">
            {errors.password.message}
          </div>
        )}
      </div>
      <div>
        <label className="text-sm text-muted-foreground">
          Konfirmasi Password
        </label>
        <Input type="password" {...register("confirmPassword")} eye />
        {errors.confirmPassword && (
          <div className="mt-1 text-xs text-destructive">
            {errors.confirmPassword.message}
          </div>
        )}
      </div>
      <Button fullWidth type="submit" isLoading={loading}>
        Daftar
      </Button>
    </form>
  );
};

export default RegisterForm;
