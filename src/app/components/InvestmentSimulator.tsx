import React, { useState } from "react";
import { SimulationInput, SimulationResult, SimulationMonthResult } from "../types";
import { 
  Calculator, 
  HelpCircle, 
  AlertTriangle, 
  RefreshCw, 
  DollarSign, 
  TrendingUp, 
  ArrowLeft, 
  Table, 
  LineChart as LineIcon,
  ChevronsRight,
  BookOpen,
  PieChart as PieIcon,
  Sparkles
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from "recharts";
import { motion, AnimatePresence } from "motion/react";

interface InvestmentSimulatorProps {
  onAddSimulationResult: (result: SimulationResult) => void;
  savedResult: SimulationResult | null;
}

export default function InvestmentSimulator({ onAddSimulationResult, savedResult }: InvestmentSimulatorProps) {
  // Simulator input state
  const [cotaValue, setCotaValue] = useState<string>("100.00");
  const [cotaYield, setCotaYield] = useState<string>("0.85");
  const [initialValue, setInitialValue] = useState<string>("10000.00");
  const [months, setMonths] = useState<string>("120");

  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");
  const [localResult, setLocalResult] = useState<SimulationResult | null>(savedResult);

  // Calculates compound investment matrix
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(cotaValue) || 10;
    const monthlyIncome = parseFloat(cotaYield) || 0;
    const initialInput = parseFloat(initialValue) || 1000;
    const durationMonths = parseInt(months) || 12;

    if (price <= 0 || initialInput <= 0 || durationMonths <= 0) {
      alert("Por favor, preencha todos os parâmetros com valores válidos superiores a zero.");
      return;
    }

    const monthlyResults: SimulationMonthResult[] = [];
    
    // Initial State allocation
    let currentCash = initialInput;
    let sharesCount = Math.floor(currentCash / price);
    let cashSurplus = currentCash % price;
    let accumulatedYield = 0;

    for (let month = 1; month <= durationMonths; month++) {
      // Calculate yield earned on current shares
      const yieldReceived = sharesCount * monthlyIncome;
      accumulatedYield += yieldReceived;

      // Reinvest dividends inside the cash balance
      cashSurplus += yieldReceived;

      // Purchase additional shares with the total available cash surplus
      const newSharesBought = Math.floor(cashSurplus / price);
      sharesCount += newSharesBought;
      
      // Update surplus cash
      cashSurplus = cashSurplus % price;

      // Current exact valuation of entire portfolio
      const totalValue = (sharesCount * price) + cashSurplus;
      const totalInvested = initialInput; // Simple static input simulation

      monthlyResults.push({
        month,
        invested: totalInvested,
        yieldReceived,
        accumulatedYield,
        totalValue,
        sharesCount
      });
    }

    const finalVal = monthlyResults[monthlyResults.length - 1].totalValue;
    const totalDividends = accumulatedYield;
    const growth = ((finalVal - initialInput) / initialInput) * 100;

    const simulationOutcome: SimulationResult = {
      input: {
        cotaValue: price,
        cotaYield: monthlyIncome,
        initialValue: initialInput,
        months: durationMonths,
      },
      monthlyResults,
      totalInvested: initialInput,
      totalDividends,
      finalPortfolioValue: finalVal,
      growthPercentage: growth
    };

    setLocalResult(simulationOutcome);
    onAddSimulationResult(simulationOutcome);
  };

  const handleReset = () => {
    setCotaValue("100.00");
    setCotaYield("0.85");
    setInitialValue("10000.00");
    setMonths("120");
    setLocalResult(null);
  };

  // Format currency value helper
  const formatBRL = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">

      {/* Left side: Input Calculator Panel */}
      <div className="lg:col-span-5 bg-[#0F1B2D] border border-line rounded-sm p-4 sm:p-6 space-y-4 sm:space-y-6 shadow-sm">
        <div className="flex items-center gap-2 pb-3 sm:pb-4 border-b border-line">
          <Calculator className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-primary" />
          <h3 className="font-display font-black text-white text-sm sm:text-base">Fórmula de Simulação NEXV</h3>
        </div>

        <form onSubmit={handleCalculate} className="space-y-3 sm:space-y-4">
          {/* Form Field 1: Valor da Cota */}
          <div>
            <label className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-text-second uppercase tracking-wider mb-1.5 sm:mb-2">
              <span>Valor da Cota (R$)</span>
              <span className="text-[9px] sm:text-[10px] text-text-muted font-normal lowercase font-mono">Ex: R$ 100,00</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-[11px] sm:text-xs font-mono text-[#8AA0B8]">R$</span>
              <input
                type="number"
                step="0.01"
                min="0.1"
                value={cotaValue}
                onChange={(e) => setCotaValue(e.target.value)}
                className="w-full bg-[#0b121e] border border-line rounded-sm pl-8 sm:pl-9 pr-3 sm:pr-4 py-2 sm:py-2.5 text-[11px] sm:text-xs text-[#FFFFFF] focus:outline-none focus:border-primary font-mono"
                required
              />
            </div>
            <p className="text-[11px] sm:text-xs text-[#8AA0B8] mt-1 leading-relaxed">
              O custo aproximado de aquisição de 1 unidade (ou cota) do Fundo Imobiliário.
            </p>
          </div>

          {/* Form Field 2: Rendimento mensal por Cota */}
          <div>
            <label className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-text-second uppercase tracking-wider mb-1.5 sm:mb-2">
              <span>Rendimento Mensal por Cota (R$)</span>
              <span className="text-[9px] sm:text-[10px] text-primary font-mono uppercase bg-primary/5 px-1.5 rounded-sm">R$ 0,85</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-[11px] sm:text-xs font-mono text-[#8AA0B8]">R$</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={cotaYield}
                onChange={(e) => setCotaYield(e.target.value)}
                className="w-full bg-[#0b121e] border border-line rounded-sm pl-8 sm:pl-9 pr-3 sm:pr-4 py-2 sm:py-2.5 text-[11px] sm:text-xs text-[#FFFFFF] focus:outline-none focus:border-primary font-mono"
                required
              />
            </div>
            <p className="text-[11px] sm:text-xs text-[#8AA0B8] mt-1 leading-relaxed">
              O dividendo mensal estimado em Reais (R$) que cada cota do Fundo distribui aos investidores.
            </p>
          </div>

          {/* Form Field 3: Valor inicial investido */}
          <div>
            <label className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-text-second uppercase tracking-wider mb-1.5 sm:mb-2">
              <span>Valor Inicial Aportado (R$)</span>
              <span className="text-[9px] sm:text-[10px] text-[#8AA0B8] font-normal lowercase font-mono">Total inicial</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 text-[11px] sm:text-xs font-mono text-[#8AA0B8]">R$</span>
              <input
                type="number"
                step="1"
                min="10"
                value={initialValue}
                onChange={(e) => setInitialValue(e.target.value)}
                className="w-full bg-[#0b121e] border border-line rounded-sm pl-8 sm:pl-9 pr-3 sm:pr-4 py-2 sm:py-2.5 text-[11px] sm:text-xs text-[#FFFFFF] focus:outline-none focus:border-primary font-mono"
                required
              />
            </div>
            <p className="text-[11px] sm:text-xs text-[#8AA0B8] mt-1 leading-relaxed">
              O capital financeiro total que você possui disponível para iniciar o fundo de estudo.
            </p>
          </div>

          {/* Form Field 4: Period in months */}
          <div>
            <label className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-text-second uppercase tracking-wider mb-1.5 sm:mb-2">
              <span>Tempo de Investimento (Meses)</span>
              <span className="text-[9px] sm:text-[10px] text-[#8AA0B8] font-mono">{(parseInt(months) / 12 || 0).toFixed(1)} anos</span>
            </label>
            <input
              type="number"
              min="1"
              max="600"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full bg-[#0b121e] border border-line rounded-sm px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs text-[#FFFFFF] focus:outline-none focus:border-primary font-mono"
              required
            />
            <p className="text-[11px] sm:text-xs text-[#8AA0B8] mt-1 leading-relaxed">
              Prazo total do experimento de reaplicação composto, em escala mensal.
            </p>
          </div>

          {/* Control CTA Buttons */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3 sm:pt-4">
            <button
              id="btn-simulation-reset"
              type="button"
              onClick={handleReset}
              className="px-2 sm:px-3 py-2.5 sm:py-3 border border-line rounded-sm text-[11px] sm:text-xs font-semibold text-text-second hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Limpar</span>
              <span className="sm:hidden">Limpar</span>
            </button>
            <button
              id="btn-simulation-calc"
              type="submit"
              className="col-span-2 px-3 sm:px-4 py-2.5 sm:py-3 bento-button-primary rounded-sm text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Calculator className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>Calcular</span>
            </button>
          </div>
        </form>

        {/* Educational definitions sidebar footer */}
        <div className="bg-[#0b1522] border border-line rounded-sm p-3 sm:p-4 space-y-3 sm:space-y-3.5">
          <div className="flex items-center gap-2 text-primary font-display font-extrabold text-[11px] sm:text-xs">
            <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Guia Didático do Aportador</span>
          </div>
          <div className="space-y-2 text-[11px] sm:text-xs text-[#8AA0B8] font-normal leading-relaxed">
            <p>
              💡 <strong className="text-white">Reinvestimento Automático:</strong> Nosso simulador calcula o dividendo recebido e, caso o bolo seja maior que o preço de uma cota nova, reinveste integralmente. Esse é o combustível dos juros compostos.
            </p>
            <p>
              💡 <strong className="text-white">Sem Comissões:</strong> Por ser uma simulação 100% de aprendizado, não há dedução de taxas administrativas, corretagens ou impostos sobre lucros.
            </p>
          </div>
        </div>
      </div>

      {/* Right side: Dynamic calculation results screen */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          {localResult ? (
            <motion.div
              key="result-pane"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Highlight metrics banner */}
              <div className="bg-[#0F1B2D] border border-line rounded-sm p-6 relative overflow-hidden shadow-sm">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-sm blur-2xl"></div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-line pb-4 mb-4 gap-2">
                  <div>
                    <span className="text-[10px] text-primary font-mono tracking-widest uppercase font-bold flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                      Simulação Calculada com Sucesso
                    </span>
                    <h3 className="font-display font-black text-white text-base mt-1">Resultado Projetado</h3>
                  </div>
                  <div className="flex bg-[#0b121e] border border-line rounded-sm p-1 relative z-10">
                    <button
                      id="sim-tab-chart"
                      type="button"
                      onClick={() => setActiveTab("chart")}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-[11px] font-semibold transition-all cursor-pointer ${activeTab === "chart" ? "bg-secondary text-white" : "text-[#8AA0B8] hover:text-white"}`}
                    >
                      <LineIcon className="h-3.5 w-3.5" />
                      <span>Gráfico</span>
                    </button>
                    <button
                      id="sim-tab-table"
                      type="button"
                      onClick={() => setActiveTab("table")}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-[11px] font-semibold transition-all cursor-pointer ${activeTab === "table" ? "bg-secondary text-white" : "text-[#8AA0B8] hover:text-white"}`}
                    >
                      <Table className="h-3.5 w-3.5" />
                      <span>Tabela</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="bg-[#0b1421] p-4 rounded-sm border border-line">
                    <span className="block text-[10px] text-[#8AA0B8] uppercase font-bold tracking-wider mb-1">
                      Aporte Inicial Cadastrado
                    </span>
                    <span className="text-base font-mono font-bold text-[#FFFFFF]">
                      {formatBRL(localResult.totalInvested)}
                    </span>
                  </div>
                  <div className="bg-[#0b1421] p-4 rounded-sm border border-line">
                    <span className="block text-[10px] text-emerald-400 uppercase font-bold tracking-wider mb-1">
                      Valor Final Projetado
                    </span>
                    <span className="text-base font-mono font-bold text-emerald-400">
                      {formatBRL(localResult.finalPortfolioValue)}
                    </span>
                  </div>
                  <div className="bg-[#0b1421] p-4 rounded-sm border border-line">
                    <span className="block text-[10px] text-[#8AA0B8] uppercase font-bold tracking-wider mb-1">
                      Crescimento Teórico
                    </span>
                    <span className="text-base font-mono font-bold text-primary">
                      +{localResult.growthPercentage.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Sub metrics details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-line text-xs text-[#D6E2F0]">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Total de Dividendos Recebidos:</span>
                    <strong className="text-primary font-mono">{formatBRL(localResult.totalDividends)}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Quantidade Final de Cotas:</span>
                    <strong className="text-white font-mono">
                      {localResult.monthlyResults[localResult.monthlyResults.length - 1].sharesCount} un
                    </strong>
                  </div>
                </div>
              </div>

              {/* View toggle container */}
              <div className="bg-[#0F1B2D] border border-line rounded-sm p-5 shadow-sm">
                {activeTab === "chart" ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider font-display">
                        Crescimento Acumulado Mês a Mês
                      </h4>
                      <span className="text-[10px] text-[#8AA0B8] font-mono tracking-wide">
                        Juros Compostos Reinvestidos
                      </span>
                    </div>

                    <div className="h-64 sm:h-72 w-full text-xs">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={localResult.monthlyResults} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#11D5CA" stopOpacity={0.25}/>
                              <stop offset="95%" stopColor="#11D5CA" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                          <XAxis dataKey="month" stroke="#8AA0B8" tickLine={false} axisLine={false} tickFormatter={(val) => `M${val}`} />
                          <YAxis stroke="#8AA0B8" tickLine={false} axisLine={false} tickFormatter={(val) => `R$${Math.round(val/1000)}k`} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: "#0F1B2D", borderColor: "rgba(255,255,255,0.1)", borderRadius: "12px", color: "#FFFFFF" }}
                            formatter={(value: any) => [formatBRL(Number(value)), ""]}
                          />
                          <Area type="monotone" name="Patrimônio Total" dataKey="totalValue" stroke="#11D5CA" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2.5} />
                          <Area type="monotone" name="Total Investido" dataKey="invested" stroke="#8AA0B8" fill="transparent" strokeWidth={1} strokeDasharray="4 4" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Detalhamento do Compounding
                    </h4>
                    <p className="text-[11px] text-text-muted mb-2">
                      Fração das cotas adquiridas mensalmente via dividendos.
                    </p>

                    <div className="overflow-y-auto max-h-72 pr-1 border border-line rounded-sm">
                      <table className="w-full text-left text-[11px] border-collapse bg-[#07111f]/40">
                        <thead className="sticky top-0 bg-[#0F1B2D] border-b border-line">
                          <tr className="text-[#8AA0B8] font-bold font-mono uppercase tracking-wider text-[9px]">
                            <th className="py-2.5 px-3">Mês</th>
                            <th className="py-2.5 px-2">Cotas</th>
                            <th className="py-2.5 px-2">Dividendo Mês</th>
                            <th className="py-2.5 px-2 text-right">Patrimônio</th>
                          </tr>
                        </thead>
                        <tbody>
                          {localResult.monthlyResults.map((row, index) => (
                            <tr key={index} className="border-b border-line hover:bg-white/5 transition-colors font-mono">
                              <td className="py-2 px-3 text-[#D6E2F0]">Mês {row.month}</td>
                              <td className="py-2 px-2 text-white">{row.sharesCount} un</td>
                              <td className="py-2 px-2 text-[#11D5CA] font-medium">+{formatBRL(row.yieldReceived)}</td>
                              <td className="py-2 px-2 text-right text-emerald-400 font-bold">{formatBRL(row.totalValue)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Obligatory educational disclaimer box */}
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs rounded-sm p-4 flex gap-3 leading-relaxed">
                <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-bold mb-0.5 uppercase tracking-wide text-[10px]">Aviso Educacional de Compromisso</h5>
                  <p className="font-normal text-[11px] opacity-90">
                    Esta é apenas uma simulação educacional de apoio acadêmico e não representa rendimento real de mercado de capitais brasileiro. O mercado real possui oscilações, tributos legais, flutuações de cotas e risco de perda real.
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-pane"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#0F1B2D] border border-line rounded-sm p-6 sm:p-8 text-center min-h-[40vh] sm:min-h-[50vh] flex flex-col justify-center items-center shadow-sm"
            >
              <div className="relative mb-4">
                <div className="relative p-4 sm:p-5 rounded-sm bg-card-dark border border-line flex items-center justify-center text-primary">
                  <Calculator className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
              </div>

              <h4 className="font-display font-black text-[#FFFFFF] text-base mb-1.5">
                Cálculo de Juros Compostos Pendente
              </h4>
              <p className="text-xs text-text-muted max-w-sm mb-6 leading-relaxed">
                Preencha os campos da carteira fictícia à esquerda e clique em <strong>"Calcular Simulação"</strong> para conferir as fórmulas matemáticas da bola de neve de reinvestimento.
              </p>
              
              <div className="flex gap-4 items-center text-left max-w-sm bg-secondary/5 rounded-sm border border-secondary/25 p-3">
                <p className="text-[10px] text-text-second leading-normal leading-relaxed text-[#D6E2F0]">
                  🎯 <strong>Estudo de Caso Prático:</strong> Teste utilizar o valor inicial de R$ 10.000, com custo de cota em R$ 100 e dividendos de R$ 0,85 para ver o que acontece após 120 e 240 meses!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
