import { WorkoutExerciseEntity } from './workout-exercise.entity';

export class WorkoutEntity {
  id: number;
  name: string;
  description: string;
  userId: number;
  workoutExercises?: WorkoutExerciseEntity[];
  createdAt: Date;
  updatedAt: Date;
}
