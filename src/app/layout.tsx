// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "DevRoot",
  description: "My interactive portfolio in macOS style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        cz-shortcut-listen="true"
        className={`${inter.variable} antialiased font-sans`}
        style={{
          backgroundImage: 'url("/mac-wallpaper.jpg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100vw',
          overflow: 'hidden' 
        }}
      >
        {children}
      </body>
    </html>
  );
}