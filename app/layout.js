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
        <div className="bg-gray-100 min-h-screen">
          <header className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
            {/* Logo */}
            <div className="text-green-700 font-bold text-2xl">
              July
            </div>

            {/* Menu de Navegação */}
            <nav className="flex gap-8 text-gray-700 font-semibold">
              <Link
                href="/"
                className="hover:text-green-600 transition outline-none focus:outline-none"
              >
                Transação
              </Link>

              <Link
                href="/grafico"
                className="hover:text-green-600 transition outline-none focus:outline-none"
              >
                Gráficos e métricas
              </Link>

              <Link
                href="/perfil"
                className="hover:text-green-600 transition outline-none focus:outline-none"
              >
                Meu perfil
              </Link>
            </nav>
          </header>

          <main className="p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
