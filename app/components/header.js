"use client";

import Link from "next/link";
import { useUser } from "../context/UserContext";

export function Header() {
  const { user, logout } = useUser();

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-green-700 font-bold text-2xl">
        July
      </div>

      {/* Menu de Navegação */}
      {user ? (
        <nav className="flex gap-8 text-gray-700 font-semibold items-center">
          <Link href="/" className="hover:text-green-600 hover:underline underline-offset-4 transition outline-none focus:outline-none">Transação</Link>
          <Link href="/historico" className="hover:text-green-600 hover:underline underline-offset-4 transition outline-none focus:outline-none">Histórico</Link>
          <Link href="/grafico" className="hover:text-green-600 hover:underline underline-offset-4 transition outline-none focus:outline-none">Gráficos</Link>
          <button onClick={logout} className="text-green-600 hover:text-green-700 transition">Sair</button>
        </nav>
      ) : (
        <nav className="flex gap-8 text-gray-700 font-semibold items-center">
          <Link href="/login" className="hover:text-green-600 hover:underline underline-offset-4 transition outline-none focus:outline-none">Login</Link>
        </nav>
      )}
    </header>
  );
}
