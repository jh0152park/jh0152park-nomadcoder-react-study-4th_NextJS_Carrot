import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: {
        template: "%s | Pepe Market",
        default: "Pepe Market",
    },
    description: "Let's enjoy with pepe",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} max-w-screen-sm mx-auto`}>
                {children}
            </body>
        </html>
    );
}
