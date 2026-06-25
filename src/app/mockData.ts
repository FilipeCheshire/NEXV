import { User, EducationalCard, MockDashboardData } from "./types";

export const DEFAULT_USER: User = {
  fullName: "Filipe Cunha",
  cpf: "123.456.789-00",
  email: "filipe.dev@next.com.br",
};

export const EDUCATIONAL_CARDS: EducationalCard[] = [
  {
    id: "fii-guide",
    title: "O que é FII (Fundo de Investimento Imobiliário)?",
    subtitle: "Aprenda a investir em imóveis sem precisar comprar um.",
    category: "FIIs",
    content: "Os Fundos de Investimento Imobiliários (FIIs) reúnem recursos de investidores com o objetivo de aplicar em empreendimentos do setor imobiliário, como galpões logísticos, shoppings, lajes corporativas ou títulos financeiros do setor (LCI, CRI). Ao adquirir cotas de um FII, você torna-se coproprietário desses ativos e recebe uma parcela mensal dos aluguéis gerados, proporcionalmente à quantidade de cotas que possuir. Na prática, é uma ferramenta democrática e acessível: você pode acessar grandes imóveis e embolsar dividendos regulares sem lidar com tributação de aluguéis (atualmente isentos para pessoas físicas sob regras vigentes) ou burocracia imobiliária tradicional.",
    readTime: "4 min de leitura"
  },
  {
    id: "dividend-yield-guide",
    title: "O que é Dividend Yield (DY)?",
    subtitle: "A métrica mais importante para investidores focado em renda passiva.",
    category: "Rendimento",
    content: "O Dividend Yield (Rendimento de Dividendos) é um indicador econômico-financeiro que mede a relação percentual entre os dividendos pagos por um ativo no último ano (ações ou cotas de FIIs) e o seu preço atual de mercado. A fórmula para calcular o DY é simples: (Dividendos Pagos por Ativo nos Últimos 12 meses / Preço Atual do Ativo) * 100. Se um Fundo Imobiliário custa R$ 100,00 e pagou R$ 10,00 de rendimentos aos seus cotistas no período, seu Dividend Yield histórico é de 10%. Para investidores de longo prazo focados no acúmulo de patrimônio, analisar o DY ajuda a selecionar ativos consistentes geradores de fluxo contínuo de caixa.",
    readTime: "3 min de leitura"
  },
  {
    id: "compound-interest",
    title: "O poder supremo dos Juros Compostos",
    subtitle: "A oitava maravilha do mundo e o motor do crescimento patrimonial.",
    category: "Conceitos",
    content: "Os juros compostos são calculados com base no valor inicial do período corrente, acumulando juros sobre o principal e também sobre os juros acumulados anteriormente. Trata-se do famoso mecanismo de 'juros sobre juros'. No universo dos investimentos mensais focados em dividendos (como FIIs), os rendimentos recebidos a cada mês atuam como combustível: ao usá-los para recomprar mais cotas do mesmo fundo, o investidor cria o chamado 'efeito 'bola de neve'. Conforme os meses passam, novos rendimentos compram cotas adicionais sem o aporte de novos recursos próprios, acelerando drasticamente o alcance da independência financeira.",
    readTime: "5 min de leitura"
  },
  {
    id: "magic-number",
    title: "O conceito do 'Número Mágico' nos FIIs",
    subtitle: "O divisor de águas onde seus investimentos passam a se autofinanciar.",
    category: "Rendimento",
    content: "No universo das simulações estatais, o 'Número Mágico' é a quantidade exata de cotas que um investidor precisa possuir para que o rendimento (dividendo) total mensal líquido recebido seja equivalente ou maior que o preço individual de uma nova cota de mercado. Por exemplo: se uma cota custa R$ 100,00 e o rendimento pago mensalmente é de R$ 1,00, seu número mágico é 100 cotas. Ao atingir essa meta, todos os meses os dividendos sozinhos compram uma nova cota para você de forma 100% autônoma, sem necessidade de transferências de dinheiro novo do seu bolso, gerando autoalimentação perfeita.",
    readTime: "4 min de leitura"
  }
];

export const MOCK_DASHBOARD_INITIAL: MockDashboardData = {
  patrimonioTotal: 84320.00,
  rentabilidadeDiaria: 0.12,
  rentabilidadeMensal: 0.98,
  scenariosRealizados: 14,
  recentSimulations: [
    { date: "01/06/2026", finalValue: 125430.22, initialValue: 50000.00, months: 60 },
    { date: "28/05/2026", finalValue: 24204.50, initialValue: 10000.00, months: 120 },
    { date: "15/05/2026", finalValue: 8500.00, initialValue: 5000.00, months: 48 },
    { date: "10/05/2026", finalValue: 312000.00, initialValue: 100000.00, months: 180 }
  ]
};

// Evolution graph coordinates
export const EVOLUTION_CHARTS_DATA = [
  { month: "Jan", Poupanca: 50000, TesouroDireto: 50200, NEXV_FIIs: 50400 },
  { month: "Fev", Poupanca: 50150, TesouroDireto: 50550, NEXV_FIIs: 51200 },
  { month: "Mar", Poupanca: 50300, TesouroDireto: 50900, NEXV_FIIs: 52100 },
  { month: "Abr", Poupanca: 50450, TesouroDireto: 51250, NEXV_FIIs: 53100 },
  { month: "Mai", Poupanca: 50600, TesouroDireto: 51600, NEXV_FIIs: 54150 },
  { month: "Jun", Poupanca: 50750, TesouroDireto: 51950, NEXV_FIIs: 55250 },
  { month: "Jul", Poupanca: 50900, TesouroDireto: 52300, NEXV_FIIs: 56450 },
  { month: "Ago", Poupanca: 51050, TesouroDireto: 52650, NEXV_FIIs: 57700 },
  { month: "Set", Poupanca: 51200, TesouroDireto: 53000, NEXV_FIIs: 59000 },
  { month: "Out", Poupanca: 51350, TesouroDireto: 53350, NEXV_FIIs: 60400 },
  { month: "Nov", Poupanca: 51500, TesouroDireto: 53700, NEXV_FIIs: 61850 },
  { month: "Dez", Poupanca: 51650, TesouroDireto: 54050, NEXV_FIIs: 63400 }
];

// Share allocations coordinates
export const PORTFOLIO_ALLOCATION = [
  { name: "Fundos de Tijolo (Logística/Shoppings)", value: 45, color: "#14D9C4" },
  { name: "Fundos de Papel (Títulos CRI/LCI)", value: 30, color: "#0B5FFF" },
  { name: "Ações Pagadoras de Dividendos", value: 15, color: "#8b5cf6" },
  { name: "Renda Fixa de Caixa", value: 10, color: "#3b82f6" }
];
