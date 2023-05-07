"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  LoginForm,
} from "@/components";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

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
        <LoginForm onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};

export default Login;
