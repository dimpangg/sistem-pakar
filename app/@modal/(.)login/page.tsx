"use client";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Input,
} from "@/components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/helpers";
import { ENDPOINTS } from "@/constant";
import { ICommonResponse } from "@/types";

const checkEmail = async (email: string) => {
  const res = await fetch(API_URL + ENDPOINTS.CHECK_EMAIL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    return Promise.reject(res);
  }

  const data: ICommonResponse<null> = await res.json();

  return data;
};

const login = async (email: string, password: string) => {
  const res = await fetch(API_URL + ENDPOINTS.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    return Promise.reject(res);
  }

  const data: ICommonResponse<{
    access_token: string;
  }> = await res.json();

  return data;
};

const Login = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEmailFound, setIsEmailFound] = useState(false);

  const [password, setPassword] = useState("");

  useEffect(() => {
    setOpen(true);

    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent
        className="bg-white"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="!text-left">Masuk</DialogTitle>
          <DialogDescription className="!text-left">
            Masuk untuk melanjutkan
          </DialogDescription>
        </DialogHeader>
        {!isEmailFound ? (
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              setLoading(true);
              setError(null);
              e.preventDefault();
              try {
                await checkEmail(email);
                setIsEmailFound(true);
              } catch (err) {
                setIsEmailFound(false);
                const data = (await (
                  err as Response
                ).json()) as ICommonResponse<null>;

                setError(data.message);
              } finally {
                setLoading(false);
              }
            }}
          >
            <div>
              <label className="text-sm text-slate-900">Email</label>
              <Input
                className="mt-1"
                placeholder="contoh@gmail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {error && (
                <div className="mt-1 text-xs text-destructive">{error}</div>
              )}
            </div>
            <div>
              <Button className="w-full" type="submit" isLoading={loading}>
                Selanjutnya
              </Button>
            </div>
          </form>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              setError(null);
              try {
                await login(email, password);
                setOpen(false);
                router.push("/diagnose");
              } catch (err) {
                const data = (await (
                  err as Response
                ).json()) as ICommonResponse<null>;

                setError(data.message);
              } finally {
                setLoading(false);
              }
            }}
          >
            <div>
              <label className="text-sm text-slate-900">Email</label>
              <div className="mt-1 text-body-medium text-slate-900">
                {email}
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-900">Password</label>
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
            <div>
              <Button className="w-full" type="submit" isLoading={loading}>
                Masuk
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Login;
