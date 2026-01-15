
export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Expert';
  instructions: string[];
}

export interface NutritionStats {
  targetCalories: number;
  consumedCalories: number;
  protein: number;
  carbs: number;
  fats: number;
}

export interface UserStats {
  weight: number;
  height: number;
  age: number;
  streak: number;
  lastWorkoutDate: string | null;
  dailySteps: number;
  caloriesBurned: number;
  nutrition: NutritionStats;
}

export interface WorkoutPlan {
  id: string;
  title: string;
  exercises: Exercise[];
  date: string;
}

export enum NavigationTab {
  DASHBOARD = 'dashboard',
  WORKOUTS = 'workouts',
  PLANNER = 'planner',
  FITAI = 'fitai'
}
