"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function HistoricoPage() {
  const { user } = useUser();
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    const data = localStorage.getItem("transactions");
    if (data) {
      setTransactions(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [selectedMonth, selectedYear, transactions]);

  const filterTransactions = () => {
    if (!selectedMonth && !selectedYear) {
      setFilteredTransactions(transactions);
      return;
    }

    const filtered = transactions.filter((t) => {
      const date = new Date(t.date);
      const matchesMonth = selectedMonth ? (date.getMonth() + 1) === parseInt(selectedMonth) : true;
      const matchesYear = selectedYear ? date.getFullYear() === parseInt(selectedYear) : true;
      return matchesMonth && matchesYear;
    });

    setFilteredTransactions(filtered);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Histórico de Transações</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">Filtrar por mês</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} - {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <option value="">Filtrar por ano</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      {/* Lista de Transações */}
      <div className="w-full max-w-4xl grid gap-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold text-green-700">{transaction.description}</h2>
                <p className="text-gray-500">{transaction.category}</p>
                <p className="text-gray-400">{new Date(transaction.date).toLocaleDateString("pt-BR")}</p>
              </div>
              <div className={`text-lg font-bold ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
                {transaction.type === "income" ? "+" : "-"}{" "}
                R$ {transaction.amount.toFixed(2).replace(".", ",")}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">Nenhuma transação encontrada.</p>
        )}
      </div>
    </div>
  );
}
