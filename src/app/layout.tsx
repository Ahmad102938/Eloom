import type { Metadata } from "next";
import "./globals.css";
import { Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme";
import ReactQueryProvider from "@/react-query";


const manrope = Manrope({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Eloom",
  description: "share AI powered content with your audience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <ClerkProvider>
        <body
          className={`${manrope.className} bg-[#171717]`}  
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              {children}
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
    </ClerkProvider>
    </html>
  );
}
