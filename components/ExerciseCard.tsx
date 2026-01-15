
import React from 'react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  onAdd?: (ex: Exercise) => void;
  showAdd?: boolean;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onAdd, showAdd = false }) => {
  const difficultyColors = {
    Beginner: 'bg-green-500/10 text-green-500',
    Intermediate: 'bg-yellow-500/10 text-yellow-500',
    Expert: 'bg-red-500/10 text-red-500',
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 mb-4 hover:border-blue-500/50 transition-colors group">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
            {exercise.name}
          </h3>
          <p className="text-slate-400 text-sm font-medium">{exercise.muscle} • {exercise.equipment}</p>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-tight ${difficultyColors[exercise.difficulty]}`}>
          {exercise.difficulty}
        </span>
      </div>
      
      <p className="text-slate-400 text-xs line-clamp-2 mt-2 italic">
        {exercise.instructions[0]}
      </p>

      {showAdd && onAdd && (
        <button 
          onClick={() => onAdd(exercise)}
          className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <i className="fa-solid fa-plus"></i>
          Add to Plan
        </button>
      )}
    </div>
  );
};

export default ExerciseCard;
