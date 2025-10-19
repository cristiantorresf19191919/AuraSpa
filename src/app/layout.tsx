import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.scss";
import { Auth0Provider } from '@auth0/nextjs-auth0';
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-provider";
import { LanguageProvider } from "@/lib/language-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura - Tu bienestar llega a ti | Servicios de Masajes Profesionales",
  description: "Descubre terapeutas de masajes profesionales y reserva tu sesión de relajación hoy. Desde sueco hasta tejido profundo, encuentra el tratamiento perfecto para tus necesidades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased`}
      >
        <Auth0Provider>
          <ThemeProvider>
            <LanguageProvider>
              <AuthProvider>
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1 main-background">
                    {children}
                  </main>
                  <FloatingChat />
                  <Footer />
                </div>
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </Auth0Provider>
      </body>
    </html>
  );
}
