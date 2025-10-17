import { Playfair_Display, Inter } from "next/font/google";

const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });
const sans  = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = { title: "Coffee Flavours" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-[var(--font-sans)]">{children}</body>
    </html>
  );
}
