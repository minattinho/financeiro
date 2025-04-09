// app/layout.js (atualizado)
'use client';

import './globals.css';
import { UserProvider, useUser } from './context/UserContext';
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 min-h-screen overflow-hidden">
        <UserProvider>
          <Header />
          <main className="flex justify-center items-center h-[calc(100vh-80px)]">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}

function Header() {
  const { user } = useUser();

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="text-green-700 font-bold text-2xl">
        July
      </div>
      <nav className="flex gap-8 text-gray-700 font-semibold items-center">
        {user ? (
          <>
            <Link className="hover:text-green-600 hover:underline underline-offset-4 transition" href="/">Transação</Link>
            <Link className="hover:text-green-600 hover:underline underline-offset-4 transition" href="/historico">Histórico</Link>
            <Link className="hover:text-green-600 hover:underline underline-offset-4 transition" href="/grafico">Gráficos</Link>
          </>
        ) : null}
        <Link className="hover:text-green-600 hover:underline underline-offset-4 transition" href="/login">Login</Link>
      </nav>
    </header>
  );
}
