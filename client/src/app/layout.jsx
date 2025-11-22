import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayout from "./clientLayout";
import ScrollProgressBar from "./components/ScrollProgressBar";

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
    // Add the `dark` class so the CSS custom properties default to the dark theme
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="antialiased bg-background text-foreground">
        <ClientLayout>
          <ScrollProgressBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
