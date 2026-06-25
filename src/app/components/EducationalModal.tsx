import React, { useState } from "react";
import { X, BookOpen, Percent, TrendingUp, HelpCircle } from "lucide-react";
import { EducationalCard } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface EducationalModalProps {
  card: EducationalCard | null;
  onClose: () => void;
}

export default function EducationalModal({ card, onClose }: EducationalModalProps) {
  if (!card) return null;

  // Mini educational calculator inside the modal to make it interactive!
  const [calcValA, setCalcValA] = useState<string>("100"); // Price or amount
  const [calcValB, setCalcValB] = useState<string>("0.85"); // Monthly yield received

  const handleCalcYield = () => {
    const assetPrice = parseFloat(calcValA) || 0;
    const monthlyIncome = parseFloat(calcValB) || 0;
    if (assetPrice <= 0) return "0.00";
    // Monthly yield %
    return ((monthlyIncome / assetPrice) * 100).toFixed(2);
  };

  const handleCalcMagicNumber = () => {
    const assetPrice = parseFloat(calcValA) || 0;
    const monthlyIncome = parseFloat(calcValB) || 0;
    if (monthlyIncome <= 0 || assetPrice <= 0) return "0";
    return Math.ceil(assetPrice / monthlyIncome).toLocaleString("pt-BR");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#07111F]/80 backdrop-blur-sm"
        />

        {/* Modal box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-card-dark border border-line rounded-[24px] overflow-hidden shadow-2xl z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header background glow */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-primary to-secondary"></div>

          {/* Modal Header */}
          <div className="p-6 flex items-start justify-between border-b border-line bg-[#0E1521]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary border border-primary/20">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-medium tracking-widest text-primary uppercase bg-primary/5 border border-primary/10 px-2.5 py-0.5 rounded-full">
                  {card.category}
                </span>
                <p className="text-xs text-text-muted mt-1">{card.readTime}</p>
              </div>
            </div>
            <button
              id="close-edu-modal"
              onClick={onClose}
              className="p-1.5 rounded-lg text-text-muted hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto space-y-6">
            <div>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-[#FFFFFF] tracking-tight leading-snug">
                {card.title}
              </h3>
              <p className="text-sm text-primary font-medium mt-1 leading-relaxed">
                {card.subtitle}
              </p>
            </div>

            <div className="text-sm text-[#D6E2F0] leading-relaxed space-y-4 font-normal">
              {card.content.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Interactive Section */}
            <div className="bg-[#0b1522] border border-line rounded-[24px] p-5 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-primary font-display font-bold text-sm">
                <Percent className="h-4 w-4" />
                <span>Simulador de Conceito Prático</span>
              </div>
              <p className="text-xs text-text-muted">
                Aplique a teoria que você acabou de ler! Insira valores fictícios para testar as métricas de Dividend Yield de forma simples.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-text-second mb-1.5">
                    Preço da Cota (R$)
                  </label>
                  <input
                    type="number"
                    value={calcValA}
                    onChange={(e) => setCalcValA(e.target.value)}
                    className="w-full bg-[#0b121e] border border-line rounded-xl px-3.5 py-2 text-sm text-[#FFFFFF] focus:outline-none focus:border-primary transition-all"
                    placeholder="Ex: 100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-second mb-1.5">
                    Rendimento Mensal por Cota (R$)
                  </label>
                  <input
                    type="number"
                    value={calcValB}
                    onChange={(e) => setCalcValB(e.target.value)}
                    className="w-full bg-[#0b121e] border border-line rounded-xl px-3.5 py-2 text-sm text-[#FFFFFF] focus:outline-none focus:border-primary transition-all"
                    placeholder="Ex: 0.85"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-line grid grid-cols-2 gap-4">
                <div className="bg-[#0f1d30] p-3 rounded-xl border border-line">
                  <span className="block text-[10px] uppercase tracking-wider text-text-muted font-medium">
                    Dividend Yield Mensal
                  </span>
                  <span className="text-lg font-mono font-bold text-primary">
                    {handleCalcYield()}%
                  </span>
                </div>
                <div className="bg-[#0f1d30] p-3 rounded-xl border border-line">
                  <span className="block text-[10px] uppercase tracking-wider text-text-muted font-medium">
                    Número Mágico (Cotas)
                  </span>
                  <span className="text-lg font-mono font-bold text-secondary">
                    {handleCalcMagicNumber()}
                  </span>
                </div>
              </div>

              <div className="flex gap-1.5 items-start mt-2">
                <HelpCircle className="h-3.5 w-3.5 text-text-muted flex-shrink-0 mt-0.5" />
                <span className="text-[10px] text-text-muted leading-relaxed">
                  *Número Mágico indica quantas cotas você precisa para receber dividendos suficientes para comprar outra cota integralmente todos os meses.
                </span>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-[#0E1521] border-t border-line flex justify-end gap-3">
            <button
              id="btn-close-modal"
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-xs font-medium text-[#D6E2F0] hover:text-[#FFFFFF] bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
            >
              Fechar Conteúdo
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
