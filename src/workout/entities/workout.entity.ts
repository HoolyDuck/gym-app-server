import { WorkoutExerciseEntity } from 'src/workout-exercise/entities/workout-exercise.entity';

export class WorkoutEntity {
  id: number;
  name: string;
  description: string;
  userId: number;
  workoutExercises?: WorkoutExerciseEntity[];

  createdAt: Date;
  updatedAt: Date;
}
