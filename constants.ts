
export const STORAGE_KEYS = {
  USER_STATS: 'fittracker_user_stats',
  WORKOUT_PLANS: 'fittracker_plans',
  COMPLETED_WORKOUTS: 'fittracker_completed'
};

export const INITIAL_STATS = {
  weight: 75,
  height: 180,
  age: 25,
  streak: 5,
  lastWorkoutDate: null,
  dailySteps: 4500,
  caloriesBurned: 320,
  nutrition: {
    targetCalories: 2400,
    consumedCalories: 1250,
    protein: 85,
    carbs: 150,
    fats: 45
  }
};
