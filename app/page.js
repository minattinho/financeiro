"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "income",
    category: "",
    date: new Date().toISOString().substr(0, 10),
  });
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redireciona se não estiver logado
    }
  }, [user, router]);

  useEffect(() => {
    const data = localStorage.getItem("transactions");
    if (data) {
      setTransactions(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const formatCurrency = (value) => {
    const onlyNumbers = value.replace(/\D/g, "");
    const floatValue = (parseFloat(onlyNumbers) / 100).toFixed(2);
    return Number(floatValue).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const formatted = formatCurrency(value);
      setFormData({ ...formData, [name]: formatted });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanAmount = parseFloat(
      formData.amount
        .replace(/\s/g, "")
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
    );

    setTransactions([
      ...transactions,
      { ...formData, amount: cleanAmount },
    ]);

    setFormData({
      description: "",
      amount: "",
      type: "income",
      category: "",
      date: new Date().toISOString().substr(0, 10),
    });

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 overflow-hidden p-4 relative">
      <h1 className="text-4xl font-extrabold text-green-700 mb-8 text-center">
        Registrar Transação
      </h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Campos */}
        <div className="flex flex-col">
          <label className="text-green-800 font-semibold mb-1">Descrição</label>
          <input
            type="text"
            name="description"
            placeholder="Descrição"
            value={formData.description}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-green-800 font-semibold mb-1">Categoria</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="">Selecione a Categoria</option>
            <option value="Lazer">Lazer</option>
            <option value="Comida">Comida</option>
            <option value="Educação">Educação</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-green-800 font-semibold mb-1">Valor</label>
          <input
            type="text"
            name="amount"
            placeholder="Valor"
            value={formData.amount}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-green-800 font-semibold mb-1">Data</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="text-green-800 font-semibold mb-1">Tipo</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option value="income">Renda</option>
            <option value="expense">Gasto</option>
          </select>
        </div>

        <div className="md:col-span-2 flex justify-center mt-4">
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all">
            Adicionar
          </button>
        </div>
      </form>

      {/* Popup de Sucesso */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg"
          >
            Transação adicionada com sucesso!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
