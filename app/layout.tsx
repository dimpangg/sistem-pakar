import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Sistem Pakar Jamur Tiram",
  description: "Sistem Deteksi Hama dan Penyakit Jamur pada Jamur Tiram",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable}`} lang="en">
      <body className="mx-auto min-h-screen max-w-sm">{children}</body>
    </html>
  );
}
