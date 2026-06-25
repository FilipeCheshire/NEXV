import React from "react";
import { MockDashboardData, SimulationResult } from "../types";
import {
  EVOLUTION_CHARTS_DATA,
  PORTFOLIO_ALLOCATION,
  DEFAULT_USER
} from "../mockData";
import {
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  HelpCircle,
  Info,
  Calendar,
  Layers,
  Percent
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { motion } from "motion/react";

interface DashboardViewProps {
  stats: MockDashboardData;
  lastSimResult: SimulationResult | null;
  onNavigateToSimulate: () => void;
}

export default function DashboardView({ stats, lastSimResult, onNavigateToSimulate }: DashboardViewProps) {

  // Format currency value helper
  const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  // Adjust total net worth dynamically if there is a completed simulation, keeping with student interaction!
  const finalPatrimonio = lastSimResult ? lastSimResult.finalPortfolioValue : stats.patrimonioTotal;
  const finalSimulationsCount = lastSimResult ? stats.scenariosRealizados + 1 : stats.scenariosRealizados;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-screen-sm sm:max-w-none space-y-4 sm:space-y-6"
    >
      {/* Top statistics cards banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {/* Card 1: Patrimonio Total */}
        <div className="bg-[#0F1B2D] border border-line p-4 sm:p-5 rounded-[16px] sm:rounded-[24px] relative overflow-hidden group hover:border-[#11D5CA] transition-all duration-300">
          <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-secondary to-primary"></div>
          <div className="flex justify-between items-start">
            <span className="text-[11px] sm:text-xs text-text-muted font-bold uppercase tracking-wider">Patrimônio Teórico</span>
            <span className="p-1 rounded-sm bg-primary/10 text-primary text-[10px] sm:text-xs font-mono font-bold">+10.4%</span>
          </div>
          <p className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight mt-2 sm:mt-3">
            {formatBRL(finalPatrimonio)}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-[9px] sm:text-[10px] text-text-muted">
            <span className="h-1.5 w-1.5 rounded-sm bg-[#11D5CA]"></span>
            <span>Simulado para fins educativos</span>
          </div>
        </div>

        {/* Card 2: Rentabilidade Diaria */}
        <div className="bg-[#0F1B2D] border border-line p-4 sm:p-5 rounded-[16px] sm:rounded-[24px] relative overflow-hidden group hover:border-[#11D5CA] transition-all duration-300">
          <div className="absolute top-0 right-0 h-1 w-full bg-[#1D35F7]"></div>
          <div className="flex justify-between items-start">
            <span className="text-[11px] sm:text-xs text-text-muted font-bold uppercase tracking-wider">Alt. Diária Média</span>
            <div className="flex items-center text-emerald-400 gap-0.5 text-[10px] sm:text-xs font-mono">
              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>+{stats.rentabilidadeDiaria}%</span>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-mono font-bold text-[#FFFFFF] tracking-tight mt-2 sm:mt-3">
            +{stats.rentabilidadeDiaria.toFixed(2)}%
          </p>
          <p className="text-[9px] sm:text-[10px] text-text-muted mt-2">
            Base da oscilação diária fictícia
          </p>
        </div>

        {/* Card 3: Rentabilidade Mensal */}
        <div className="bg-[#0F1B2D] border border-line p-4 sm:p-5 rounded-[16px] sm:rounded-[24px] relative overflow-hidden group hover:border-[#11D5CA] transition-all duration-300">
          <div className="absolute top-0 right-0 h-1 w-full bg-[#11D5CA]"></div>
          <div className="flex justify-between items-start">
            <span className="text-[11px] sm:text-xs text-text-muted font-bold uppercase tracking-wider">Rentabilidade Mês</span>
            <div className="flex items-center text-emerald-400 gap-0.5 text-[10px] sm:text-xs font-mono">
              <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>+{stats.rentabilidadeMensal}%</span>
            </div>
          </div>
          <p className="text-xl sm:text-2xl font-mono font-bold text-emerald-300 tracking-tight mt-2 sm:mt-3">
            +{stats.rentabilidadeMensal.toFixed(2)}%
          </p>
          <p className="text-[9px] sm:text-[10px] text-[#8AA0B8] mt-2">
            Superando a poupança histórica
          </p>
        </div>

        {/* Card 4: Simulações finalistas */}
        <div className="bg-[#0F1B2D] border border-line p-4 sm:p-5 rounded-[16px] sm:rounded-[24px] relative overflow-hidden group hover:border-[#11D5CA] transition-all duration-300">
          <div className="absolute top-0 right-0 h-1 w-full bg-[#8b5cf6]"></div>
          <div className="flex justify-between items-start">
            <span className="text-[11px] sm:text-xs text-text-muted font-bold uppercase tracking-wider">Simulações Totais</span>
            <span className="p-1 rounded-sm bg-secondary/10 text-secondary text-[10px] sm:text-xs font-mono font-bold">Sandbox</span>
          </div>
          <p className="text-xl sm:text-2xl font-mono font-bold text-white tracking-tight mt-2 sm:mt-3">
            {finalSimulationsCount}
          </p>
          <p className="text-[9px] sm:text-[10px] text-text-muted mt-2">
            Cálculos realizados com sucesso
          </p>
        </div>
      </div>

      {/* Main Charts: Bento-grid with 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

        {/* Left Side big chart: Evolução Patrimonial comparativa */}
        <div className="lg:col-span-2 bg-[#0F1B2D] border border-line rounded-[16px] sm:rounded-[24px] p-4 sm:p-5 flex flex-col justify-between hover:border-primary/30 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
            <div>
              <h3 className="font-display font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <TrendingUp className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-primary" />
                <span className="hidden sm:inline">Diferencial de Crescimento Acumulado (1 Ano)</span>
                <span className="sm:hidden">Crescimento Acumulado</span>
              </h3>
              <p className="text-[11px] sm:text-xs text-text-muted">
                <span className="hidden sm:inline">Comparativo didático: Poupança vs. Tesouro Direto vs. Aporte em FIIs NEXV</span>
                <span className="sm:hidden">Poupança vs. Tesouro vs. FIIs NEXV</span>
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#0a121d] px-2 sm:px-2.5 py-1 rounded-sm border border-line text-[9px] sm:text-[10px] text-text-muted font-mono uppercase">
              <Info className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary" />
              <span className="hidden sm:inline">Cenário Inicial R$ 50.000</span>
              <span className="sm:hidden">R$ 50.000</span>
            </div>
          </div>

          {/* Area Chart Container */}
          <div className="h-52 sm:h-64 lg:h-72 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={EVOLUTION_CHARTS_DATA} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorNext" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#11D5CA" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#11D5CA" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTesouro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1D35F7" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#1D35F7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#8AA0B8" tickLine={false} axisLine={false} />
                <YAxis stroke="#8AA0B8" tickLine={false} axisLine={false} tickFormatter={(val) => `R$${val / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0F1B2D", borderColor: "#1a2b42", borderRadius: "12px", color: "#FFFFFF" }}
                  itemStyle={{ color: "#D6E2F0" }}
                  formatter={(value: any) => [formatBRL(Number(value)), ""]}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: "10px" }} />
                <Area type="monotone" name="Poupança (Simulado)" dataKey="Poupanca" stroke="#8AA0B8" fill="transparent" strokeWidth={1.5} strokeDasharray="4 4" />
                <Area type="monotone" name="Tesouro Direto Selic" dataKey="TesouroDireto" stroke="#1D35F7" fillOpacity={1} fill="url(#colorTesouro)" strokeWidth={2} />
                <Area type="monotone" name="Estratégia NEXV FIIs" dataKey="NEXV_FIIs" stroke="#11D5CA" fillOpacity={1} fill="url(#colorNext)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Educational insight box attached */}
          <div className="mt-3 sm:mt-4 bg-[#0a121e] border border-line p-3 sm:p-3.5 rounded-sm flex items-start gap-2 sm:gap-2.5">
            <Percent className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-[10px] sm:text-[11px] text-text-second leading-relaxed font-normal">
              <strong className="text-primary font-semibold">Análise Educacional:</strong> Observe como, ao longo do ano, a reinvestimento contínuo de rendimentos e taxas superiores nos FIIs gerou um descolamento expressivo da Poupança convencional, maximizando o patrimônio sem aportes extras.
            </p>
          </div>
        </div>

        {/* Right side pie chart: Alocação do portfólio */}
        <div className="bg-[#0F1B2D] border border-line rounded-[16px] sm:rounded-[24px] p-4 sm:p-5 flex flex-col justify-between hover:border-primary/30 transition-colors duration-300">
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-white flex items-center gap-2">
              <Layers className="h-4 w-4 sm:h-4.5 sm:w-4.5 text-secondary" />
              <span className="hidden sm:inline">Alocação Teórica Recomendada</span>
              <span className="sm:hidden">Alocação Recomendada</span>
            </h3>
            <p className="text-[11px] sm:text-xs text-text-muted mb-3 sm:mb-4">
              <span className="hidden sm:inline">Diversificação macro-estratégica para alunos iniciantes</span>
              <span className="sm:hidden">Diversificação para iniciantes</span>
            </p>
          </div>

          <div className="h-40 sm:h-48 w-full flex items-center justify-center text-xs relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PORTFOLIO_ALLOCATION}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {PORTFOLIO_ALLOCATION.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "#0F1B2D", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#FFFFFF" }}
                  formatter={(value: any) => [`${Number(value)}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Dynamic center indicator counter */}
            <div className="absolute flex flex-col items-center">
              <span className="text-[9px] sm:text-[10px] text-text-muted font-bold uppercase tracking-wider">Alocação</span>
              <span className="text-lg sm:text-xl font-mono font-bold text-white">100%</span>
            </div>
          </div>

          {/* Table Custom Legend */}
          <div className="space-y-2 mt-2">
            {PORTFOLIO_ALLOCATION.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs bg-[#0a121e]/40 p-2 rounded-sm border border-line">
                <div className="flex items-center gap-2 truncate">
                  <span className="h-2.5 w-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-text-second truncate font-medium">{item.name}</span>
                </div>
                <span className="font-mono text-white font-bold ml-2">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent simulations ledger */}
      <div className="bg-[#0F1B2D] border border-line rounded-[16px] sm:rounded-[24px] p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 sm:mb-4">
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-white">
              <span className="hidden sm:inline">Histórico de Estudos e Simulações Recentes</span>
              <span className="sm:hidden">Histórico de Simulações</span>
            </h3>
            <p className="text-[11px] sm:text-xs text-text-muted">
              <span className="hidden sm:inline">Cenários calculados e persistidos localmente para análise conceitual</span>
              <span className="sm:hidden">Cenários calculados para análise</span>
            </p>
          </div>
          <button
            id="dash-btn-simulate-history"
            onClick={onNavigateToSimulate}
            className="flex items-center gap-1.5 text-[11px] sm:text-xs text-primary hover:text-white font-semibold transition-colors cursor-pointer self-start"
          >
            <span>Simular Novo</span>
            <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* List Grid table logs */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] sm:text-xs border-collapse">
            <thead>
              <tr className="border-b border-line text-text-muted font-bold font-mono uppercase tracking-wider text-[9px] sm:text-[10px]">
                <th className="pb-2 sm:pb-3 pr-2">Data / Versão</th>
                <th className="hidden md:table-cell pb-2 sm:pb-3 px-2">
                  Aporte Inicial
                </th>

                <th className="hidden sm:table-cell pb-2 sm:pb-3 px-2">
                  Período
                </th>
                <th className="pb-2 sm:pb-3 px-2 text-right">Resultado</th>
                <th className="pb-2 sm:pb-3 pl-2 text-right">Retorno</th>
              </tr>
            </thead>
            <tbody>
              {/* If user has calculated, inject on top! */}
              {lastSimResult && (
                <tr className="border-b border-line text-text-second hover:bg-white/5 transition-colors font-medium">
                  <td className="py-2 sm:py-3 pr-2 text-primary flex items-center gap-2 font-bold select-none">
                    <span className="h-2 w-2 rounded-sm bg-primary animate-ping"></span>
                    <span className="hidden sm:inline">Hoje (Cálculo Recente)</span>
                    <span className="sm:hidden">Hoje (Recente)</span>
                  </td>
                  <td className="hidden md:table-cell py-2 sm:py-3 px-2 font-mono">
                    {formatBRL(lastSimResult.input.initialValue)}
                  </td>
                  <td className="hidden md:table-cell py-2 sm:py-3 px-2 font-mono">
                    {lastSimResult.input.months} meses ({(lastSimResult.input.months / 12).toFixed(1)} anos)
                  </td>
                  <td className="py-2 sm:py-3 px-2 text-right font-mono font-bold text-emerald-400">
                    {formatBRL(lastSimResult.finalPortfolioValue)}
                  </td>
                  <td className="py-2 sm:py-3 pl-2 text-right font-mono text-emerald-300">
                    +{lastSimResult.growthPercentage.toFixed(1)}%
                  </td>
                </tr>
              )}

              {stats.recentSimulations.map((sim, i) => {
                const growthFactor = ((sim.finalValue - sim.initialValue) / sim.initialValue) * 100;
                return (
                  <tr key={i} className="border-b border-line text-text-second hover:bg-white/5 transition-colors">
                    <td className="py-2 sm:py-3 pr-2 font-mono text-text-muted flex items-center gap-2">
                      <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-text-muted" />
                      <span>{sim.date}</span>
                    </td>
                    <td className="hidden md:table-cell py-2 sm:py-3 px-2 font-mono">
                      {formatBRL(sim.initialValue)}
                    </td>

                    <td className="hidden sm:table-cell py-2 sm:py-3 px-2 font-mono">
                      {sim.months} meses ({(sim.months / 12).toFixed(0)} anos)
                    </td>
                    <td className="py-2 sm:py-3 px-2 text-right font-mono font-bold text-white">
                      {formatBRL(sim.finalValue)}
                    </td>
                    <td className="py-2 sm:py-3 pl-2 text-right font-mono text-text-muted">
                      +{growthFactor.toFixed(0)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
