import { Geist, Geist_Mono } from "next/font/google";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./globals.css";
import ClientLayout from "./clientLayout";
import ScrollProgressBar from "./components/ScrollProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // ✅ prevents layout shift (CLS fix)
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap", // ✅ important
});

export const metadata = {
  title: "TxShield",
  description: "Simulate Ethereum transactions securely",
  icons: {
    icon: "/Images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
    >
      <body className="bg-background text-foreground antialiased font-sans">
        <ClientLayout>
          <ScrollProgressBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}