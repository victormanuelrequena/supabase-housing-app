"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase?.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      // @ts-ignore
      data: { subscription },
    } = supabase?.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <nav className="bg-black p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link
              href={session ? "/datos" : "/login"}
              className="text-white text-xl font-bold"
            >
              Proyecto trayecto 3
            </Link>
            <div className="space-x-4">
              {session ? (
                <>
                  <Link
                    href="/documentacion"
                    className="text-white hover:underline"
                  >
                    Ver documentación
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-white hover:underline">
                    Login
                  </Link>
                  <Link href="/registro" className="text-white hover:underline">
                    Registro
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
