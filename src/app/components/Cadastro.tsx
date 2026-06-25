import React, { useState } from "react";
import { User } from "../types";
import { Eye, EyeOff, ArrowRight, Sparkles, Lock, User as UserIcon, Mail, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import NexvLogo from "./NexvLogo";

interface CadastroProps {
  onRegisterSuccess: (user: User) => void;
  onNavigateToLogin: () => void;
}

export default function Cadastro({ onRegisterSuccess, onNavigateToLogin }: CadastroProps) {
  const [fullName, setFullName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isFocused, setIsFocused] = useState<string | null>(null);

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
    if (rawVal.length <= 14) {
      setCpf(formatted);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanedCpf = cpf.replace(/\D/g, "");
    if (cleanedCpf.length < 11) {
      setErrorMsg("O CPF deve conter 11 dígitos.");
      return;
    }

    if (fullName.trim().split(" ").length < 2) {
      setErrorMsg("Informe seu nome completo.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMsg("Email inválido.");
      return;
    }

    if (password.length < 4) {
      setErrorMsg("A senha deve ter pelo menos 4 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("As senhas não coincidem.");
      return;
    }

    onRegisterSuccess({
      fullName: fullName,
      cpf: cpf,
      email: email,
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bg.png.png')" }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Animated gradient orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl"
      />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Glass Card */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Animated border gradient */}
            <motion.div 
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-r from-secondary via-primary to-secondary opacity-20"
              style={{ backgroundSize: "200% 200%" }}
            />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Logo */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex justify-center mb-8"
              >
                <NexvLogo size={120} />
              </motion.div>

              {/* Title */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-center mb-8"
              >
                <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                  Criar conta <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">NEXV</span>
                </h1>
                <p className="text-text-muted text-sm">
                  Comece sua jornada de investimentos
                </p>
              </motion.div>

              {/* Error Message */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4"
                  >
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-4 py-3 rounded-xl text-center font-medium">
                      {errorMsg}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Name Input */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <label htmlFor="reg-name" className="block text-xs font-semibold text-text-second uppercase tracking-wider mb-2">
                    Nome completo
                  </label>
                  <div className={`relative transition-all duration-300 ${isFocused === "name" ? "scale-[1.02]" : ""}`}>
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <UserIcon className="h-5 w-5 text-text-muted" />
                    </div>
                    <input
                      id="reg-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onFocus={() => setIsFocused("name")}
                      onBlur={() => setIsFocused(null)}
                      placeholder="Seu nome completo"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </motion.div>

                {/* CPF and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                  >
                    <label htmlFor="reg-cpf" className="block text-xs font-semibold text-text-second uppercase tracking-wider mb-2">
                      CPF
                    </label>
                    <div className={`relative transition-all duration-300 ${isFocused === "cpf" ? "scale-[1.02]" : ""}`}>
                      <input
                        id="reg-cpf"
                        type="text"
                        required
                        value={cpf}
                        onChange={handleCpfChange}
                        onFocus={() => setIsFocused("cpf")}
                        onBlur={() => setIsFocused(null)}
                        placeholder="000.000.000-00"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                      />
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <label htmlFor="reg-email" className="block text-xs font-semibold text-text-second uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <div className={`relative transition-all duration-300 ${isFocused === "email" ? "scale-[1.02]" : ""}`}>
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-text-muted" />
                      </div>
                      <input
                        id="reg-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setIsFocused("email")}
                        onBlur={() => setIsFocused(null)}
                        placeholder="seu@email.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Password and Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.55, duration: 0.5 }}
                  >
                    <label htmlFor="reg-password" className="block text-xs font-semibold text-text-second uppercase tracking-wider mb-2">
                      Senha
                    </label>
                    <div className={`relative transition-all duration-300 ${isFocused === "password" ? "scale-[1.02]" : ""}`}>
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-text-muted" />
                      </div>
                      <input
                        id="reg-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsFocused("password")}
                        onBlur={() => setIsFocused(null)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-10 py-3 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-text-muted hover:text-white transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <label htmlFor="reg-confirm-password" className="block text-xs font-semibold text-text-second uppercase tracking-wider mb-2">
                      Confirmar
                    </label>
                    <div className={`relative transition-all duration-300 ${isFocused === "confirm" ? "scale-[1.02]" : ""}`}>
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-text-muted" />
                      </div>
                      <input
                        id="reg-confirm-password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setIsFocused("confirm")}
                        onBlur={() => setIsFocused(null)}
                        placeholder="••••••••"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm text-white placeholder-text-muted/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-mono"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Submit Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-secondary to-primary text-white font-semibold text-sm py-4 px-6 rounded-xl transition-all shadow-lg shadow-secondary/25 hover:shadow-secondary/40 flex items-center justify-center gap-2 group"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Criar conta</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </form>

              {/* Login Link */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-6 text-center"
              >
                <p className="text-sm text-text-muted">
                  Já tem uma conta?{" "}
                  <button
                    type="button"
                    onClick={onNavigateToLogin}
                    className="text-secondary hover:text-primary font-semibold transition-colors hover:underline cursor-pointer"
                  >
                    Fazer login
                  </button>
                </p>
              </motion.div>

              {/* Footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-8 pt-6 border-t border-white/10 text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="h-3 w-3 text-secondary" />
                  <span className="text-[10px] text-text-muted font-mono tracking-widest uppercase">
                    Ambiente Educacional
                  </span>
                </div>
                <p className="text-[10px] text-text-muted">
                  © 2026 NEXV Educacional
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
