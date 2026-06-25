"use client";

import React, { useState } from "react";
import { User, EducationalCard, SimulationResult } from "./types";
import { MOCK_DASHBOARD_INITIAL, DEFAULT_USER } from "./mockData";

// Components
import AuthCard from "./components/AuthCard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import DashboardView from "./components/DashboardView";
import InvestmentSimulator from "./components/InvestmentSimulator";
import EducationalModal from "./components/EducationalModal";
import DevelopmentNotice from "./components/DevelopmentNotice";

// Animation framework
import { motion, AnimatePresence } from "motion/react";

export default function Home() {
  // Session authentication state (initially null to require logging in)
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  
  // Core navigation tab menu
  const [currentTab, setCurrentTab] = useState<string>("Home");
  
  // Mobile responsive drawer open status
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Modal toggle state
  const [selectedEduCard, setSelectedEduCard] = useState<EducationalCard | null>(null);
  
  // Compounded interest simulations calculated history
  const [lastSimulationResult, setLastSimulationResult] = useState<SimulationResult | null>(null);
  const [simulationsCount, setSimulationsCount] = useState(0);

  // Auth Callbacks
  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setCurrentTab("Home");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLastSimulationResult(null);
    setSimulationsCount(0);
    setCurrentTab("Home");
  };

  // Callback to persist active student simulations onto the workspace dashboard
  const handleAddSimulationResult = (result: SimulationResult) => {
    setLastSimulationResult(result);
    setSimulationsCount((prev) => prev + 1);
  };

  // Helper to change screen and scroll view safely to top
  const handleTabChange = (tabName: string) => {
    setCurrentTab(tabName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Main layout router
  const renderWorkspaceContent = () => {
    switch (currentTab) {
      case "Home":
        return (
          <HomeView
            userName={currentUser?.fullName || "Investidor"}
            simulationsCount={simulationsCount}
            lastResult={lastSimulationResult}
            onNavigateToSimulate={() => handleTabChange("Simulações")}
            onSelectEducationalCard={(card) => setSelectedEduCard(card)}
          />
        );
      case "Dashboard":
        return (
          <DashboardView
            stats={MOCK_DASHBOARD_INITIAL}
            lastSimResult={lastSimulationResult}
            onNavigateToSimulate={() => handleTabChange("Simulações")}
          />
        );
      case "Simulações":
        return (
          <InvestmentSimulator
            onAddSimulationResult={handleAddSimulationResult}
            savedResult={lastSimulationResult}
          />
        );
      case "Meu Portfólio":
      case "Ativos":
      case "Configurações":
        return (
          <DevelopmentNotice
            pageName={currentTab}
            onGoBack={() => handleTabChange("Home")}
          />
        );
      default:
        return (
          <div className="text-center py-12">
            <p className="text-text-muted">Seção não encontrada.</p>
          </div>
        );
    }
  };

  // 1. Unauthenticated Router (AuthCard with flip animation)
  if (!currentUser) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <AuthCard onAuthSuccess={handleAuthSuccess} />
      </motion.div>
    );
  }

  // 2. Authenticated Workspace Layout (Sidebar + Navbar + Page Router)
  return (
    <div className="min-h-screen bg-bg-dark text-white font-sans flex relative">
      {/* Background Mesh */}
      <div className="mesh-bg"></div>

      {/* Main Sidebar (Desktop persistent, Mobile overlayed drawer) */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        userName={currentUser.fullName}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onToggleOpen={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:pl-64 min-h-screen">
        {/* Top Header Navbar */}
        <Navbar
          currentTab={currentTab}
          userName={currentUser.fullName}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Routed Workspace Body */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderWorkspaceContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Studious Drawer Overlay Modal */}
      <EducationalModal
        card={selectedEduCard}
        onClose={() => setSelectedEduCard(null)}
      />
    </div>
  );
}
