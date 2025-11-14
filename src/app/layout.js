import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import { BookingModalProvider } from "./context/BookingModalContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Auvoria",
  description: "Luxury Hotel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <BookingModalProvider>
          {children}
          <Navbar />
          <div id="modal-root"></div>
        </BookingModalProvider>
      </body>
    </html>
  );
}
