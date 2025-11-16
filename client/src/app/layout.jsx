import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientLayout";
import SolProvider from "./provider/SolProvider";

const EvmProvider = dynamic(() => import("./provider/EvmProvider"), {
  ssr: false
})

const SolProvider = dynamic(() => import("./provider/SolProvider"), {
  ssr: false
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TxShield",
  description: "Simulate Ethereum transactions securely",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-background text-foreground">
        <ClientLayout>
          <EvmProvider>
            <SolProvider>
              {children}
            </SolProvider>
          </EvmProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
