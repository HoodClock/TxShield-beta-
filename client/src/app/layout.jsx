import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "@solana/wallet-adapter-react-ui/styles.css";
import "./globals.css";
import ClientLayout from "./clientLayout";
import HamburgerMenu from "./components/HamburgerMenu";
import TransitionOverlay from "./components/TransitionOverlay";
import { UIProvider } from "./provider/UIProvider";
import ThemeController from "./components/ThemeController";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const clashDisplay = localFont({
  src: '../../public/fonts/ClashDisplay-Bold.woff2',
  variable: '--font-clash',
  display: 'swap',
});

export const metadata = {
  title: "TxShield",
  description: "Simulate Ethereum transactions securely",
  icons: {
    icon: '/Images/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${clashDisplay.variable}`}>
      <body className="antialiased bg-background text-foreground overflow-x-hidden">
        <UIProvider>
          <ClientLayout>
            <HamburgerMenu />
            <ThemeController />
            <TransitionOverlay />
            {children}
          </ClientLayout>
        </UIProvider>
      </body>
    </html>
  );
}
