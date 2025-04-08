"use client";

import "./globals.css";
import Link from "next/link";
import { UserProvider, useUser } from "./context/UserContext";

function Header() {
  const { user, logout } = useUser();

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-green-700 font-bold text-2xl">
        July
      </div>
  {user ? (
  <span>Bem-vindo, {user.email}</span>
) : (
  <Link href="/login">Login</Link>
)}


      {/* Menu de Navegação */}
      <nav className="flex gap-8 text-gray-700 font-semibold items-center">
        <Link href="/" className="hover:text-green-600 hover:underline underline-offset-4 transition outline-none focus:outline-none">
          Transação
        </Link>
        <Link href="/historico" className="hover:text-green-600 hover:underline underline-offset-4 transition outline-none focus:outline-none">
          Histórico
        </Link>
        <Link href="/grafico" className="hover:text-green-600 hover:underline underline-offset-4 transition outline-none focus:outline-none">
          Gráficos
        </Link>

        {user ? (
          <>
            <span className="text-green-700 font-semibold">{user}</span>
            <button onClick={logout} className="text-red-500 font-bold hover:underline">
              Sair
            </button>
          </>
        ) : (
          <Link href="/login" className="hover:text-green-600 hover:underline underline-offset-4 transition outline-none focus:outline-none">
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <UserProvider>
          <div className="bg-gray-100 min-h-screen font-sans">
            <Header />
            <main className="p-8 max-w-7xl mx-auto">{children}</main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
