import React from "react";
import { ArrowLeft, Construction, Milestone } from "lucide-react";
import { motion } from "motion/react";

interface DevelopmentNoticeProps {
  pageName: string;
  onGoBack: () => void;
}

export default function DevelopmentNotice({ pageName, onGoBack }: DevelopmentNoticeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
    >
      <div className="relative mb-6">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-secondary to-primary opacity-30 blur-lg animate-pulse"></div>
        <div className="relative bg-card-dark p-6 rounded-full border border-white/5 flex items-center justify-center">
          <Milestone className="h-16 w-16 text-primary" />
        </div>
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#FFFFFF] tracking-tight mb-3">
        {pageName}
      </h2>
      <p className="text-primary font-mono text-sm tracking-widest uppercase mb-4">
        Módulo Educacional em Construção
      </p>

      <div className="max-w-md bg-card-dark/60 border border-white/5 rounded-2xl p-6 mb-8 text-left">
        <div className="flex items-start gap-3">
          <Construction className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-[#FFFFFF] mb-1">Funcionalidade em desenvolvimento</h4>
            <p className="text-xs text-text-muted leading-relaxed">
              Estamos modelando simuladores de mercado adicionais e módulos teóricos de nível avançado baseados no modelo do Banco Central. Em breve, você poderá configurar transações simuladas completas nesse espaço.
            </p>
          </div>
        </div>
      </div>

      <button
        id="btn-back-from-dev"
        onClick={onGoBack}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-medium text-sm transition-all shadow-lg hover:shadow-secondary/20 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para o Início
      </button>
    </motion.div>
  );
}
