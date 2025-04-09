import "./globals.css";
import { UserProvider } from "./context/UserContext";
import Header from "./context/UserContext";

export const metadata = {
  title: "July - Assistente Financeiro",
  description: "Gerencie suas finanças com estilo e inteligência.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gray-50 flex flex-col">
        <UserProvider>
          <Header />
          <main className="flex-grow flex items-center justify-center p-4">
            {children}
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
