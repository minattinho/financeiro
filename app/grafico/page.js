"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

const COLORS = ["#34D399", "#60A5FA", "#FBBF24", "#F472B6"];

export default function GraficoPage() {
  const { user } = useUser();
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    const expenses = transactions.filter(t => t.type === "expense");

    const categoryTotals = expenses.reduce((acc, transaction) => {
      if (!acc[transaction.category]) {
        acc[transaction.category] = 0;
      }
      acc[transaction.category] += transaction.amount;
      return acc;
    }, {});

    const chartData = Object.keys(categoryTotals).map(category => ({
      name: category,
      value: categoryTotals[category],
    }));

    setData(chartData);
  }, [transactions]);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-green-700 mb-8">
        Gráficos de Gastos
      </h1>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-gray-600 text-center mt-10">
          Nenhum dado para exibir o gráfico.
        </div>
      )}
    </div>
  );
}
