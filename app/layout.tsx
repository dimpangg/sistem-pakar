import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Sistem Pakar Jamur Tiram",
  description: "Sistem Deteksi Hama dan Penyakit Jamur pada Jamur Tiram",
  themeColor: "#34D399",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable}`} lang="en">
      <body className="min-h-screen">
        {children}
        {modal}
      </body>
    </html>
  );
}
