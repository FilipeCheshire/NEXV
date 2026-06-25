import React from "react";
import { Menu, User, Calendar, GraduationCap, ChevronRight } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  userName: string;
  onToggleSidebar: () => void;
}

export default function Navbar({ currentTab, userName, onToggleSidebar }: NavbarProps) {
  const getSubTitleText = () => {
    switch (currentTab) {
      case "Home":
        return "Resumo geral e lições de educação financeira";
      case "Dashboard":
        return "Painel analítico da sua carteira teórica e métricas";
      case "Simulações":
        return "Calcule o poder dos juros compostos em Fundos Imobiliários";
      case "Meu Portfólio":
        return "Criação de carteira de ativos e distribuição";
      case "Ativos":
        return "Gerenciador de ativos cadastrados na sandbox";
      case "Configurações":
        return "Personalizações do simulador institucional";
      default:
        return "Educação Financeira & Crescimento Saudável";
    }
  };

  const formattedDate = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return (
    <header className="h-20 border-b border-white/5 bg-[#07111F]/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Sidebar mobile toggle + Title section */}
      <div className="flex items-center gap-4">
        <button
          id="toggle-sidebar-mobile"
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-sm text-[#D6E2F0] hover:text-[#FFFFFF] bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
          title="Abrir Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          {/* Breadcrumbs for desktop */}
          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-[#8AA0B8] mb-1">
            <span>NEXV</span>
            <ChevronRight className="h-3 w-3 text-white/20" />
            <span className="text-[#11D5CA] font-bold">{currentTab}</span>
          </div>
          
          <h1 className="font-display text-lg md:text-xl font-extrabold text-white tracking-tight leading-none">
            {currentTab}
          </h1>
        </div>
      </div>

      {/* Right widgets */}
      <div className=" items-center hidden md:flex gap-3">
        {/* Date tracker widget */}
        <div className="flex items-center gap-2 bg-card-dark border border-[#1a2b42] px-3 py-1.5 rounded-sm">
          <Calendar className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-mono text-text-second">{formattedDate}</span>
        </div>

        {/* Academic tag (Ambiente Didático) */}
        <div className="flex items-center gap-1.5 bg-secondary/15 border border-secondary/30 px-3 py-1.5 rounded-sm">
          <GraduationCap className="h-4 w-4 text-primary" />
          <span className="text-[11px] font-semibold text-text-second">Ambiente Didático</span>
        </div>
      </div>
    </header>
  );
}
