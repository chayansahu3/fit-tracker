
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import { NavigationTab, UserStats } from './types';
import { STORAGE_KEYS, INITIAL_STATS } from './constants';
import Dashboard from './views/Dashboard';
import Workouts from './views/Workouts';
import FitAI from './views/FitAI';

// Simple Router implementation based on internal state for SPA feel
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.DASHBOARD);
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_STATS);
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  // Persist stats when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(stats));
  }, [stats]);

  const renderView = () => {
    switch (activeTab) {
      case NavigationTab.DASHBOARD:
        return <Dashboard stats={stats} setStats={setStats} />;
      case NavigationTab.WORKOUTS:
        return <Workouts />;
      case NavigationTab.FITAI:
        return <FitAI />;
      case NavigationTab.PLANNER:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
            <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 border-2 border-dashed border-blue-500/30">
               <i className="fa-solid fa-calendar-days text-4xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-2">My Workout Plan</h2>
              <p className="text-slate-500 text-sm max-w-[200px]">You haven't scheduled any workouts for today yet.</p>
            </div>
            <button 
               onClick={() => setActiveTab(NavigationTab.WORKOUTS)}
               className="px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all active:scale-95"
            >
              Browse Exercises
            </button>
          </div>
        );
      default:
        return <Dashboard stats={stats} setStats={setStats} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="pt-2 pb-10">
        {renderView()}
      </div>
    </Layout>
  );
};

export default App;
