"use client";

import Link from "next/link";
import { useUser } from "../context/UserContext";

export default function Header() {
  const { user, logout } = useUser();

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="text-green-700 font-bold text-2xl">
        July
      </div>

      <nav className="flex gap-8 text-gray-700 font-semibold items-center">
        {user ? (
          <>
            <Link href="/" className="hover:text-green-600 hover:underline">Transação</Link>
            <Link href="/historico" className="hover:text-green-600 hover:underline">Histórico</Link>
            <Link href="/grafico" className="hover:text-green-600 hover:underline">Gráficos</Link>
            <button
              onClick={logout}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-4 rounded"
            >
              Sair
            </button>
          </>
        ) : (
          <Link href="/login" className="hover:text-green-600 hover:underline">Login</Link>
        )}
      </nav>
    </header>
  );
}
