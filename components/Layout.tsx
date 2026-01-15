
import React from 'react';
import { NavigationTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs = [
    { id: NavigationTab.DASHBOARD, icon: 'fa-house', label: 'Home' },
    { id: NavigationTab.WORKOUTS, icon: 'fa-dumbbell', label: 'Workouts' },
    { id: NavigationTab.PLANNER, icon: 'fa-calendar-check', label: 'Plans' },
    { id: NavigationTab.FITAI, icon: 'fa-robot', label: 'FitAI' },
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20 max-w-md mx-auto bg-slate-900 shadow-2xl overflow-hidden">
      <header className="p-6 bg-slate-900 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="p-2 bg-blue-600 rounded-xl">
               <i className="fa-solid fa-bolt text-white"></i>
            </span>
            FitTracker<span className="text-blue-500">Pro</span>
          </h1>
          <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
             <i className="fa-solid fa-user text-slate-400"></i>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4">
        {children}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 px-6 py-3 safe-bottom z-50">
        <div className="flex justify-between items-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-all ${
                activeTab === tab.id ? 'text-blue-500 scale-110' : 'text-slate-500'
              }`}
            >
              <i className={`fa-solid ${tab.icon} text-xl`}></i>
              <span className="text-[10px] font-medium uppercase tracking-wider">{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
