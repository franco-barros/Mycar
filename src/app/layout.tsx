import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.css";
import Navbar from "../components/navbar";
import { Footer } from "../components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Car Estética Vehicular",
  description: "Servicios premium para el cuidado de tu vehículo.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={inter.variable}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
