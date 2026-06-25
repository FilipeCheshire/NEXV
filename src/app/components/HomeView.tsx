import React from "react";
import { EducationalCard, SimulationResult } from "../types";
import { EDUCATIONAL_CARDS } from "../mockData";
import { 
  ArrowUpRight, 
  BookOpen, 
  Calculator, 
  HelpCircle, 
  TrendingUp, 
  Sparkles,
  Award,
  DollarSign
} from "lucide-react";
import { motion } from "motion/react";

interface HomeViewProps {
  userName: string;
  simulationsCount: number;
  lastResult: SimulationResult | null;
  onNavigateToSimulate: () => void;
  onSelectEducationalCard: (card: EducationalCard) => void;
}

export default function HomeView({
  userName,
  simulationsCount,
  lastResult,
  onNavigateToSimulate,
  onSelectEducationalCard,
}: HomeViewProps) {
  
  // Format currency helpers
  const formatBRL = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-sm bg-gradient-to-r from-[#0F1B2D] via-[#1D35F7]/15 to-[#11D5CA]/15 border border-line p-4 sm:p-5 md:p-6 lg:p-8 shadow-sm">
        <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-[#11D5CA]/5 rounded-sm blur-3xl -mr-6 -mt-6 sm:-mr-8 sm:-mt-8 lg:-mr-12 lg:-mt-12"></div>
        <div className="absolute bottom-0 left-1/3 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-[#1D35F7]/5 rounded-sm blur-3xl"></div>

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1.5 sm:space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#11D5CA] font-mono tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Simulador Financeiro Acadêmico</span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Seja bem-vindo, <span className="gradient-text">{userName}</span>!
            </h2>
            <p className="text-[#D6E2F0]/85 text-[11px] sm:text-xs md:text-sm max-w-xl font-normal leading-relaxed">
              O NEXV é uma sandbox segura de investimentos fictícios. Aqui você pode testar fórmulas, prever aportes mensais e simular o poder dos dividendos sem arriscar seu capital.
            </p>
          </div>

          <button
            id="home-btn-simulate"
            onClick={onNavigateToSimulate}
            className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bento-button-primary rounded-sm font-display font-extrabold text-[11px] sm:text-xs cursor-pointer md:self-center self-start transition-all"
          >
            <Calculator className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            <span className="hidden sm:inline">Iniciar Nova Simulação</span>
            <span className="sm:hidden">Nova Simulação</span>
          </button>
        </div>
      </div>

      {/* Metric summary boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
        {/* Metric 1: Simulated Patrimony balance */}
        <div className="bg-[#0F1B2D] border border-line p-4 sm:p-5 rounded-sm relative group overflow-hidden transition-all duration-300 hover:border-primary/50">
          <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-secondary/50 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-[11px] sm:text-xs text-[#8AA0B8] font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Patrimônio Simulado</span>
            <DollarSign className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
          </p>
          <p className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
            {lastResult ? formatBRL(lastResult.finalPortfolioValue) : formatBRL(50000.00)}
          </p>
          <span className="text-[9px] sm:text-[10px] text-text-muted mt-2 block">
            {lastResult ? "*Baseado no seu último cálculo" : "*Saldo didático de demonstração"}
          </span>
        </div>

        {/* Metric 2: Simulations count */}
        <div className="bg-[#0F1B2D] border border-line p-4 sm:p-5 rounded-sm relative group overflow-hidden transition-all duration-300 hover:border-primary/50">
          <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-secondary/50 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-[11px] sm:text-xs text-[#8AA0B8] font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Simulações Realizadas</span>
            <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-secondary" />
          </p>
          <p className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight">
            {simulationsCount}
          </p>
          <span className="text-[9px] sm:text-[10px] text-primary font-mono mt-2 block">
            Conhecimento livre de perdas
          </span>
        </div>

        {/* Metric 3: Profit evolution or Yield simulation */}
        <div className="bg-[#0F1B2D] border border-line p-4 sm:p-5 rounded-sm relative group overflow-hidden sm:col-span-2 lg:col-span-1 transition-all duration-300 hover:border-primary/50">
          <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-secondary/50 to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="text-[11px] sm:text-xs text-[#8AA0B8] font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Última Rentabilidade Geral</span>
            <TrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-emerald-400" />
          </p>
          <p className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 tracking-tight">
            {lastResult ? `+${lastResult.growthPercentage.toFixed(2)}%` : "+62.80%"}
          </p>
          <span className="text-[9px] sm:text-[10px] text-text-muted mt-2 block">
            {lastResult ? `Em simulação de ${lastResult.input.months} meses` : "*Demonstração simulada padrão"}
          </span>
        </div>
      </div>

      {/* Educational cards guide section */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
              Módulos Teóricos e Conceitos
            </h3>
            <p className="text-[11px] sm:text-xs text-text-muted">
              Selecione um card para aprofundar seu conhecimento com exemplos interativos.
            </p>
          </div>
          <BookOpen className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary" />
        </div>

        {/* Dynamic educational cards list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
          {EDUCATIONAL_CARDS.map((card, idx) => (
            <motion.div
              id={`edu-card-${card.id}`}
              whileHover={{ y: -4, borderColor: "#11D5CA" }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectEducationalCard(card)}
              key={card.id}
              className="bg-[#0F1B2D] border border-line rounded-sm p-4 sm:p-6 cursor-pointer space-y-3 sm:space-y-3.5 transition-all text-left group shadow-sm"
            >
              <div className="flex justify-between items-start">
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#11D5CA] uppercase bg-[#11D5CA]/5 border border-[#11D5CA]/15 px-2 sm:px-2.5 py-1 rounded-sm font-bold">
                  {card.category}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#8AA0B8] font-mono">{card.readTime}</span>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-display font-bold text-xs sm:text-sm text-[#FFFFFF] group-hover:text-primary transition-colors flex items-center justify-between gap-2">
                  <span>{card.title}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-text-muted group-hover:text-primary transition-colors flex-shrink-0" />
                </h4>
                <p className="text-[11px] sm:text-xs text-text-muted leading-relaxed line-clamp-2">
                  {card.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-line flex items-center text-[10px] sm:text-[11px] text-primary/80 group-hover:text-primary font-semibold transition-colors">
                <span className="hidden sm:inline">Estudar módulo e testar fórmulas →</span>
                <span className="sm:hidden">Estudar módulo →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
