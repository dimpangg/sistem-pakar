import { Footer, Header } from "@/components";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="mx-auto min-h-[calc(100vh-120px-64px-8px)] max-w-sm">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
