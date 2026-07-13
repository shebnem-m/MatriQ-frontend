import { AuthProvider } from "@/src/context/AuthContext";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import "./globals.css";

export const metadata = {
  title: "MatriQ - Industrial Marketplace",
  description: "The industrial marketplace for verified source materials and trusted suppliers.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-paper text-ink font-body antialiased">
        <AuthProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
