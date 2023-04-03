import "./globals.css";
import { Inter } from "next/font/google";

// export const metadata = {
//   title: "Sistem Pakar Jamur Tiram",
//   description: "Sistem Deteksi Hama dan Penyakit Jamur pada Jamur Tiram",
// };

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.variable}`} lang="en">
      <head>
        <meta name="theme-color" content="#0F172A" />
        <meta
          name="description"
          content="Sistem Deteksi Hama dan Penyakit Jamur pada Jamur Tiram"
        />
        <title>Sistem Pakar Jamur Tiram</title>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body className="mx-auto min-h-screen max-w-sm">{children}</body>
    </html>
  );
}
