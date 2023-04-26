import { Footer, Header } from "@/components";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
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
