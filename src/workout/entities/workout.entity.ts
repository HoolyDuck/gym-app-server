import { WorkoutExercise } from 'src/workout-exercise/entities/workout-exercise.entity';

export class Workout {
  id: number;
  name: string;
  description: string;
  userId: number;
  workoutExercises: WorkoutExercise[];
}
