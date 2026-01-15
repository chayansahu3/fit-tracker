
import React, { useState, useEffect } from 'react';
import { Exercise } from '../types';
import ExerciseCard from '../components/ExerciseCard';

const MOCK_EXERCISES: Exercise[] = [
  {
    id: '1',
    name: 'Push Ups',
    muscle: 'Chest',
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    instructions: ['Place hands shoulder-width apart', 'Lower body until chest touches floor', 'Push back up']
  },
  {
    id: '2',
    name: 'Diamond Pushups',
    muscle: 'Triceps',
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    instructions: ['Place hands close together in a diamond shape', 'Lower chest to hands', 'Push back up']
  },
  {
    id: '3',
    name: 'Squats',
    muscle: 'Legs',
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    instructions: ['Stand with feet hip-width apart', 'Lower hips as if sitting in a chair', 'Keep back straight']
  },
  {
    id: '4',
    name: 'Pull Ups',
    muscle: 'Back',
    equipment: 'Pull-up bar',
    difficulty: 'Expert',
    instructions: ['Hang from bar with overhand grip', 'Pull chin above bar', 'Lower slowly']
  },
  {
    id: '5',
    name: 'Plank',
    muscle: 'Core',
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    instructions: ['Hold pushup position on elbows', 'Keep body in straight line', 'Engage core']
  },
  {
    id: '6',
    name: 'Lunges',
    muscle: 'Legs',
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    instructions: ['Step forward with one leg', 'Lower back knee toward floor', 'Push back to start']
  }
];

const Workouts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>(MOCK_EXERCISES);
  const [loading, setLoading] = useState(false);

  const fetchExercises = async (query: string) => {
    setLoading(true);
    // Simulate a brief local delay for UI feel
    await new Promise(resolve => setTimeout(resolve, 400));
    
    if (!query || query === 'Popular gym exercises') {
      setExercises(MOCK_EXERCISES);
    } else {
      const filtered = MOCK_EXERCISES.filter(ex => 
        ex.name.toLowerCase().includes(query.toLowerCase()) ||
        ex.muscle.toLowerCase().includes(query.toLowerCase()) ||
        ex.equipment.toLowerCase().includes(query.toLowerCase())
      );
      setExercises(filtered);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExercises('Popular gym exercises');
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchExercises(searchTerm);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-white mb-1">Discover</h2>
        <p className="text-slate-400 text-sm">Browse our exercise library</p>
      </header>

      <form onSubmit={handleSearch} className="relative">
        <input 
          type="text" 
          placeholder="Search by muscle or name..."
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-slate-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"></i>
        <button type="submit" className="hidden">Search</button>
      </form>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['Chest', 'Back', 'Legs', 'Arms', 'Core'].map(cat => (
          <button 
            key={cat} 
            onClick={() => {
              setSearchTerm(cat);
              fetchExercises(cat);
            }}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-slate-300 whitespace-nowrap hover:bg-slate-700 active:bg-blue-600 active:text-white transition-all"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-8 h-8 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="text-slate-500 text-sm">Searching library...</p>
          </div>
        ) : exercises.length > 0 ? (
          exercises.map(ex => (
            <ExerciseCard key={ex.id} exercise={ex} />
          ))
        ) : (
          <div className="text-center py-20 text-slate-500">
             <i className="fa-solid fa-face-sad-tear text-4xl mb-4"></i>
             <p>No exercises found. Try a different search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workouts;
