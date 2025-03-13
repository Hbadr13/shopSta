import "./globals.css";
import { Metadata } from "next";
import Demo from "@/components/Demo";

export const metadata: Metadata = {
  title: "ShopSta",
  description: "Your go-to store for quality products and great deals.",
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png']
  }
};


const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  return (
    <html lang="en">
      <body className=" overflow-x-hidden w-full"
      >
        <Demo>
          {children}
        </Demo>
      </body>
    </html>
  );
}
export default RootLayout