import React from "react";
import { 
  Home, 
  LayoutDashboard, 
  Briefcase, 
  Coins, 
  Settings, 
  Calculator, 
  LogOut, 
  Menu, 
  X
} from "lucide-react";
import NexvLogo from "./NexvLogo";

interface SidebarProps {
  currentTab: string;
  onTabChange: (tabName: string) => void;
  userName: string;
  onLogout: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

export default function Sidebar({ 
  currentTab, 
  onTabChange, 
  userName, 
  onLogout,
  isOpen,
  onToggleOpen
}: SidebarProps) {
  
  const menuItems = [
    { id: "Home", label: "Home", icon: Home },
    { id: "Dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "Simulações", label: "Simulações", icon: Calculator },
    { id: "Meu Portfólio", label: "Meu Portfólio", icon: Briefcase },
    { id: "Ativos", label: "Ativos", icon: Coins },
    { id: "Configurações", label: "Configurações", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Sidebar overlay toggles */}
      {isOpen && (
        <div 
          onClick={onToggleOpen} 
          className="lg:hidden fixed inset-0 z-40 bg-bg-dark/80 backdrop-blur-sm cursor-pointer"
        />
      )}

      {/* Main Sidebar */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-card-dark border-r border-[#1a2b42] flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Upper content */}
        <div>
          {/* Logo Brand Header */}
          <div className="h-20 px-6 border-b border-[#1a2b42] flex items-center justify-between">
            <NexvLogo />
            {/* Mobile close trigger */}
            <button 
              id="sidebar-close-mobile"
              onClick={onToggleOpen} 
              className="lg:hidden p-1 rounded-sm hover:bg-white/5 text-[#8AA0B8] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4">
            <p className="px-3 text-[10px] font-semibold text-[#8AA0B8] uppercase tracking-widest mb-3">
              Área de Simulações
            </p>

            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                
                return (
                  <button
                    id={`menu-item-${item.id.toLowerCase().replace(/\s/g, "-")}`}
                    key={item.id}
                    onClick={() => {
                      onTabChange(item.id);
                      if (isOpen) onToggleOpen();
                    }}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-bl-xl rounded-br-xl rounded-tl-xl text-sm font-medium transition-all group cursor-pointer ${isActive ? "bg-secondary text-white shadow-lg shadow-secondary/15 font-semibold" : "text-[#D6E2F0] hover:text-white hover:bg-white/5"}`}
                  >
                    <Icon className={`h-4.5 w-4.5 flex-shrink-0 transition-transform group-hover:scale-105 ${isActive ? "text-[#11D5CA]" : "text-[#8AA0B8] group-hover:text-primary"}`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-sm bg-[#11D5CA] animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Lower Content / User Section */}
        
          <div className="flex items-center justify-between gap-2.5 bg-[#0a1421] p-3 rounded-sm border border-[#1a2b42]">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="h-9 w-9 rounded-sm bg-secondary/20 border border-secondary/40 flex items-center justify-center text-primary font-bold text-sm uppercase flex-shrink-0">
                {userName.substring(0, 2)}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate leading-none mb-1">{userName}</p>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-primary font-mono tracking-wider">Aluno</span>
                </div>
              </div>
            </div>
            
            <button
              id="btn-sidebar-logout"
              onClick={onLogout}
              title="Encerrar Sessão"
              className="p-2 rounded-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors cursor-pointer flex-shrink-0"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        
      </aside>
    </>
  );
}
