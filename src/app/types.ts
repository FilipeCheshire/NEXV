export interface User {
  fullName: string;
  cpf: string;
  email: string;
}

export interface SimulationInput {
  cotaValue: number;      // Valor da cota (R$)
  cotaYield: number;      // Rendimento por cota (R$ por mês)
  initialValue: number;   // Valor inicial investido (R$)
  months: number;         // Tempo de investimento (em meses)
}

export interface SimulationMonthResult {
  month: number;
  invested: number;       // Total investido acumulado
  yieldReceived: number;  // Rendimento recebido no mês
  accumulatedYield: number; // Rendimento acumulado total
  totalValue: number;     // Valor total da carteira (investido + rendimentos reinvestidos)
  sharesCount: number;    // Quantidade de cotas possuídas
}

export interface SimulationResult {
  input: SimulationInput;
  monthlyResults: SimulationMonthResult[];
  totalInvested: number;
  totalDividends: number;
  finalPortfolioValue: number;
  growthPercentage: number;
}

export interface EducationalCard {
  id: string;
  title: string;
  subtitle: string;
  category: "FIIs" | "Ações" | "Conceitos" | "Rendimento";
  content: string;
  readTime: string;
}

export interface MockDashboardData {
  patrimonioTotal: number;
  rentabilidadeDiaria: number;
  rentabilidadeMensal: number;
  scenariosRealizados: number;
  recentSimulations: Array<{
    date: string;
    finalValue: number;
    initialValue: number;
    months: number;
  }>;
}
