"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

export default function Grafico() {
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const lineChartInstanceRef = useRef(null);
  const pieChartInstanceRef = useRef(null);
  const [transactions, setTransactions] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Novos estados para mostrar os totais
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const data = localStorage.getItem("transactions");
    if (data) {
      setTransactions(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    renderLineChart();
    renderPieChart();
    calculateTotals();
  }, [transactions, selectedMonth, selectedYear]);

  const calculateTotals = () => {
    let income = 0;
    let expense = 0;

    transactions
      .filter((t) => {
        const tDate = new Date(t.date);
        return (
          tDate.getMonth() + 1 === selectedMonth && tDate.getFullYear() === selectedYear
        );
      })
      .forEach((t) => {
        if (t.type === "income") {
          income += t.amount;
        } else {
          expense += t.amount;
        }
      });

    setTotalIncome(income);
    setTotalExpense(expense);
  };

  const renderLineChart = () => {
    const ctx = lineChartRef.current.getContext("2d");
    if (lineChartInstanceRef.current) {
      lineChartInstanceRef.current.destroy();
    }

    const dailyData = {};

    transactions
      .filter((t) => {
        const tDate = new Date(t.date);
        return (
          tDate.getMonth() + 1 === selectedMonth && tDate.getFullYear() === selectedYear
        );
      })
      .forEach((t) => {
        const tDate = new Date(t.date);
        const key = `${tDate.getDate().toString().padStart(2, "0")}/${(tDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
        if (!dailyData[key]) dailyData[key] = { income: 0, expense: 0 };
        if (t.type === "income") {
          dailyData[key].income += t.amount;
        } else {
          dailyData[key].expense += t.amount;
        }
      });

    const labels = Object.keys(dailyData).sort();
    const incomeData = labels.map((label) => dailyData[label].income);
    const expenseData = labels.map((label) => dailyData[label].expense);

    lineChartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels.length > 0 ? labels : ["Sem dados"],
        datasets: [
          {
            label: "Renda",
            data: incomeData.length > 0 ? incomeData : [0],
            borderColor: "green",
            fill: false,
          },
          {
            label: "Gasto",
            data: expenseData.length > 0 ? expenseData : [0],
            borderColor: "red",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  };

  const renderPieChart = () => {
    const ctx = pieChartRef.current.getContext("2d");
    if (pieChartInstanceRef.current) {
      pieChartInstanceRef.current.destroy();
    }

    const categoryTotals = {};

    transactions
      .filter((t) => {
        const tDate = new Date(t.date);
        return (
          tDate.getMonth() + 1 === selectedMonth && tDate.getFullYear() === selectedYear
        );
      })
      .forEach((t) => {
        if (t.type === "expense") {
          if (!categoryTotals[t.category]) {
            categoryTotals[t.category] = 0;
          }
          categoryTotals[t.category] += t.amount;
        }
      });

    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    pieChartInstanceRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels.length > 0 ? labels : ["Sem categorias"],
        datasets: [
          {
            label: "Gastos por Categoria",
            data: values.length > 0 ? values : [1],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#4BC0C0",
              "#9966FF",
              "#FF9F40",
            ],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10 p-4">
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <div>
          <label className="block mb-1 font-medium">Mês</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border rounded p-2"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Ano</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="border rounded p-2"
          >
            {[2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mostrando os totais */}
      <div className="w-full max-w-2xl bg-gray-100 rounded-lg shadow-md p-4 text-center">
        <h2 className="text-xl font-bold mb-4">Resumo do Mês</h2>
        <p className="text-green-600 font-semibold">Renda Total: R$ {totalIncome.toFixed(2)}</p>
        <p className="text-red-600 font-semibold">Gastos Totais: R$ {totalExpense.toFixed(2)}</p>
      </div>

      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Gráfico de Renda vs Gastos</h1>
        <canvas ref={lineChartRef} className="w-full h-auto" />
      </div>

      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Gastos por Categoria</h2>
        <canvas ref={pieChartRef} className="w-full h-auto" />
      </div>
    </div>
  );
}
