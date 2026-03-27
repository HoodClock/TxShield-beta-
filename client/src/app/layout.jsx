import "@solana/wallet-adapter-react-ui/styles.css";
import "./globals.css";
import ClientLayout from "./clientLayout";
import ScrollProgressBar from "./components/ScrollProgressBar";

export const metadata = {
  title: "TxShield",
  description: "Simulate Ethereum transactions securely",
  icons: {
    icon: '/Images/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className="antialiased bg-background text-foreground"
        suppressHydrationWarning
      >
        <ClientLayout>
          <ScrollProgressBar />
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
