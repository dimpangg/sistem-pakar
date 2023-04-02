import { Footer, Header } from "@/components";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      {children}
      <Footer className="mt-auto" />
    </main>
  );
};

export default Layout;
