import { ExerciseEntity } from 'src/exercise/entities/exercise.entity';

export class WorkoutExerciseEntity {
  id: number;
  workoutId: number;
  exerciseId: number;
  exercise?: ExerciseEntity;
  createdAt: Date;
  updatedAt: Date;
}
