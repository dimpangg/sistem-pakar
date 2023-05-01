import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto flex min-h-screen max-w-sm items-center justify-center">
      {children}
    </main>
  );
};

export default Layout;
