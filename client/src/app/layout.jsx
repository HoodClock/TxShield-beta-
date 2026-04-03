<<<<<<< HEAD
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
=======
>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a
import "@solana/wallet-adapter-react-ui/styles.css";
import "./globals.css";
import ClientLayout from "./clientLayout";
import ScrollProgressBar from "./components/ScrollProgressBar";

<<<<<<< HEAD
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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

=======
>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a
export const metadata = {
  title: "TxShield",
  description: "Simulate Ethereum transactions securely",
  icons: {
    icon: '/Images/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
<<<<<<< HEAD
    // Add the `dark` class so the CSS custom properties default to the dark theme
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${clashDisplay.variable} dark`}>
      <body className="antialiased bg-background text-foreground" suppressHydrationWarning>
=======
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="antialiased bg-background text-foreground"
        suppressHydrationWarning
      >
>>>>>>> 2b8ce27548758e8d2162cf2fbd583c584e69af4a
        <ClientLayout>
          <ScrollProgressBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
