"use client";
import React, { useState } from "react";
import { Button } from "@/components";
import { checkEmail, login } from "@/services";
import { ICommonResponse } from "@/types";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "../molecules/Input";

const LoginForm = ({ onClose }: { onClose?: () => void }) => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailFound, setIsEmailFound] = useState(false);

  const [password, setPassword] = useState("");

  async function submitEmail(e: React.FormEvent<HTMLFormElement>) {
    setLoading(true);
    setError(null);
    e.preventDefault();
    try {
      await checkEmail(email);
      setIsEmailFound(true);
    } catch (err) {
      setIsEmailFound(false);
      const data = (await (err as Response).json()) as ICommonResponse<null>;

      setError(data.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitPassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      router.push("/diagnose");
      onClose?.();
    } catch (err) {
      const data = (await (err as Response).json()) as ICommonResponse<null>;

      setError(data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={!isEmailFound ? submitEmail : submitPassword}
    >
      <div>
        <label className="text-sm text-muted-foreground">Email</label>
        {!isEmailFound ? (
          <>
            <Input
              placeholder="contoh@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && (
              <div className="mt-1 text-xs text-destructive">
                {error === "Email is not found" ? (
                  <>
                    Email tidak ditemukan.{" "}
                    <Link
                      className="text-slate-500 underline underline-offset-[3px]"
                      href={{
                        pathname: "/register",
                        query: { email },
                      }}
                      onClick={onClose}
                    >
                      Daftar
                    </Link>{" "}
                    untuk membuat akun baru.
                  </>
                ) : (
                  error
                )}
              </div>
            )}
          </>
        ) : (
          <div className="mt-1 text-body-medium text-slate-900">{email}</div>
        )}
      </div>
      {isEmailFound && (
        <div>
          <label className="text-sm text-muted-foreground">Password</label>
          <Input
            className="mt-1"
            placeholder="********"
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && (
            <div className="mt-1 text-xs text-destructive">{error}</div>
          )}
        </div>
      )}
      <Button isLoading={loading} fullWidth type="submit">
        {!isEmailFound ? "Selanjutnya" : "Masuk"}
      </Button>
    </form>
  );
};

export default LoginForm;
