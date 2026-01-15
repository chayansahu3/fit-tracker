
import React, { useMemo, useState } from 'react';
import { UserStats } from '../types';
import { analyzeMealWithAI } from '../services/NutritionService';

interface DashboardProps {
  stats: UserStats;
  setStats: React.Dispatch<React.SetStateAction<UserStats>>;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, setStats }) => {
  const [mealInput, setMealInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const bmi = useMemo(() => {
    const heightInMeters = stats.height / 100;
    return (stats.weight / (heightInMeters * heightInMeters)).toFixed(1);
  }, [stats.weight, stats.height]);

  const nutritionProgress = useMemo(() => {
    return Math.min(Math.round((stats.nutrition.consumedCalories / stats.nutrition.targetCalories) * 100), 100);
  }, [stats.nutrition]);

  const handleLogMeal = async () => {
    if (!mealInput.trim()) return;
    setIsAnalyzing(true);
    const result = await analyzeMealWithAI(mealInput);
    if (result) {
      setStats(prev => ({
        ...prev,
        nutrition: {
          ...prev.nutrition,
          consumedCalories: prev.nutrition.consumedCalories + result.calories,
          protein: prev.nutrition.protein + result.protein,
          carbs: prev.nutrition.carbs + result.carbs,
          fats: prev.nutrition.fats + result.fats,
        }
      }));
      setMealInput('');
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Streak Header */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 shadow-lg shadow-blue-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <i className="fa-solid fa-fire text-8xl -rotate-12"></i>
        </div>
        <div className="relative z-10">
          <p className="text-blue-100 text-sm font-medium uppercase tracking-widest mb-1">Current Streak</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-5xl font-black text-white">{stats.streak}</h2>
            <span className="text-xl font-bold text-blue-100">Days</span>
          </div>
          <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
             <div className="h-full bg-white transition-all duration-1000" style={{ width: '70%' }}></div>
          </div>
        </div>
      </section>

      {/* Nutrition Tracker Card */}
      <section className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-white">Daily Nutrition</h3>
          <span className="text-xs font-bold text-slate-400 bg-slate-700/50 px-2 py-1 rounded-lg uppercase">Calories</span>
        </div>

        <div className="flex items-center gap-6 mb-6">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle cx="48" cy="48" r="42" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-700" />
              <circle cx="48" cy="48" r="42" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray={264} strokeDashoffset={264 - (264 * nutritionProgress) / 100} className="text-blue-500 transition-all duration-1000 ease-out" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-white">{nutritionProgress}%</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-400 uppercase">Protein</span>
              <span className="text-white">{stats.nutrition.protein}g</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{ width: '65%' }}></div>
            </div>
            
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-400 uppercase">Carbs</span>
              <span className="text-white">{stats.nutrition.carbs}g</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500" style={{ width: '45%' }}></div>
            </div>
          </div>
        </div>

        {/* AI Meal Logger */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="Log meal (e.g. '2 eggs and toast')"
            className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-600"
            value={mealInput}
            onChange={(e) => setMealInput(e.target.value)}
            disabled={isAnalyzing}
          />
          <button 
            onClick={handleLogMeal}
            disabled={isAnalyzing}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-500 transition-all active:scale-90 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <i className="fa-solid fa-plus text-xs"></i>
            )}
          </button>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2 mb-2 text-orange-500">
            <i className="fa-solid fa-person-walking"></i>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tight">Daily Steps</span>
          </div>
          <p className="text-2xl font-bold text-white">{stats.dailySteps.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2 mb-2 text-blue-400">
            <i className="fa-solid fa-scale-balanced"></i>
            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-tight">BMI Score</span>
          </div>
          <p className="text-2xl font-bold text-white">{bmi}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
