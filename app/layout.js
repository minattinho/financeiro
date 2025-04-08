// Arquivo: app/layout.js
import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "July - Assistente Financeiro",
  description: "Gerencie suas finanças com inteligência.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <div className="bg-gray-100 min-h-screen font-sans">
          <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
            <div className="text-green-700 font-bold text-2xl">July</div>

            <nav className="flex gap-8 text-gray-700 font-semibold">
              <Link href="/" className="hover:text-green-600 hover:underline underline-offset-4 transition outline-none focus:outline-none">
                Transação
              </Link>
              <Link href="/historico" className="hover:text-green-600 hover:underline underline-offset-4 transition outline-none focus:outline-none">
                Histórico
              </Link>
              <Link href="/grafico" className="hover:text-green-600 hover:underline underline-offset-4 transition outline-none focus:outline-none">
                Gráficos
              </Link>
              <Link href="/login" className="hover:text-green-600 hover:underline underline-offset-4 transition outline-none focus:outline-none">
                Login
              </Link>
            </nav>
          </header>

          <main className="p-8 max-w-7xl mx-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
