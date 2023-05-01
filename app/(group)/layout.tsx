import { Footer, Header } from "@/components";
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const jwt = cookieStore.has("jwt");

  if (!jwt) {
    redirect("/login");
  }

  return (
    <>
      <Header className="border-b border-slate-200" />
      <main className="mx-auto min-h-[calc(100vh-120px-64px)] max-w-sm">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
