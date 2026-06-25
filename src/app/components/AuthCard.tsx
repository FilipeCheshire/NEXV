import React, { useState } from "react";
import { User } from "../types";
import { Eye, EyeOff, ArrowRight, Sparkles, Lock, User as UserIcon, Mail, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import NexvLogo from "./NexvLogo";

interface AuthCardProps {
  onAuthSuccess: (user: User) => void;
}

export default function AuthCard({ onAuthSuccess }: AuthCardProps) {
  const [isLogin, setIsLogin] = useState(true);
  
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const formatCPF = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}.${numbers.slice(3)}`;
    if (numbers.length <= 9) return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6)}`;
    return `${numbers.slice(0, 3)}.${numbers.slice(3, 6)}.${numbers.slice(6, 9)}-${numbers.slice(9, 11)}`;
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const formatted = formatCPF(rawVal);
    if (rawVal.length <= 14) setCpf(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const cleanedCpf = cpf.replace(/\D/g, "");
    if (cleanedCpf.length < 11) {
      setError("O CPF deve conter 11 dígitos.");
      return;
    }

    if (isLogin) {
      if (!password || password.length < 4) {
        setError("A senha deve ter pelo menos 4 caracteres.");
        return;
      }
      onAuthSuccess({
        fullName: "Filipe Cunha",
        cpf: cpf,
        email: "filipe.dev@next.com.br",
      });
    } else {
      if (fullName.trim().split(" ").length < 2) {
        setError("Informe seu nome completo.");
        return;
      }
      if (!email.includes("@") || !email.includes(".")) {
        setError("Email inválido.");
        return;
      }
      if (password.length < 4) {
        setError("A senha deve ter pelo menos 4 caracteres.");
        return;
      }
      onAuthSuccess({ fullName, cpf, email });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg.png.png')" }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-28 h-28 sm:w-56 sm:h-56 lg:w-80 lg:h-80 bg-secondary/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md mx-auto">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-10" />

          <div className="relative z-10">
            <div className="flex justify-center mb-3 sm:mb-4 lg:mb-6">
              <NexvLogo size={60} />
            </div>

            <div className="text-center mb-3 sm:mb-4 lg:mb-6">
              <h1 className="font-display text-lg sm:text-xl lg:text-2xl font-extrabold text-white tracking-tight mb-1">
                {isLogin ? "Bem-vindo ao " : "Criar conta "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">NEXV</span>
              </h1>
              <p className="text-text-muted text-[11px] sm:text-xs">
                {isLogin ? "Simulador de investimentos educacional" : "Comece sua jornada de investimentos"}
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? "login" : "register"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {error && (
                  <div className="mb-3 sm:mb-4 bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] sm:text-xs px-3 sm:px-4 py-2 rounded-lg text-center">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  {!isLogin && (
                    <div>
                      <label className="block text-[11px] sm:text-xs font-semibold text-text-second uppercase tracking-wider mb-1 sm:mb-1.5">
                        Nome completo
                      </label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Seu nome completo"
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-text-second uppercase tracking-wider mb-1 sm:mb-1.5">
                      CPF
                    </label>
                    <input
                      type="text"
                      required
                      value={cpf}
                      onChange={handleCpfChange}
                      placeholder="000.000.000-00"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-primary transition-all font-mono"
                    />
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-[11px] sm:text-xs font-semibold text-text-second uppercase tracking-wider mb-1 sm:mb-1.5">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-primary transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] sm:text-xs font-semibold text-text-second uppercase tracking-wider mb-1 sm:mb-1.5">
                      Senha
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-10 py-2 sm:py-2.5 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-primary transition-all font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-2"
                  >
                    {isLogin ? "Entrar" : <><UserPlus className="h-4 w-4" /><span>Criar conta</span></>}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </motion.div>
            </AnimatePresence>

            <div className="mt-3 sm:mt-4 lg:mt-5 text-center">
              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(""); }}
                className="text-xs sm:text-sm text-text-muted hover:text-primary transition-colors"
              >
                {isLogin ? "Não tem uma conta? Criar conta" : "Já tem uma conta? Fazer login"}
              </button>
            </div>

            <div className="mt-3 sm:mt-4 lg:mt-6 pt-3 sm:pt-4 border-t border-white/10 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Sparkles className="h-3 w-3 text-primary" />
                <span className="text-[9px] sm:text-[10px] text-text-muted font-mono tracking-widest uppercase">
                  Ambiente Educacional
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-text-muted">© 2026 NEXV Educacional</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
