import { Injectable } from '@nestjs/common';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';
import { UpdateWorkoutExerciseDto } from './dto/update-workout-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WorkoutExerciseService {

  constructor(private prismaService: PrismaService) {}

  create(createWorkoutExerciseDto: CreateWorkoutExerciseDto) {
    return this.prismaService.workoutExercise.create({
      data: createWorkoutExerciseDto,
    });
  }

  findAll() {
    return this.prismaService.workoutExercise.findMany();
  }

  findOne(id: number) {
    return this.prismaService.workoutExercise.findUnique({
      where: { id },
    });
  }

  update(id: number, updateWorkoutExerciseDto: UpdateWorkoutExerciseDto) {
    return this.prismaService.workoutExercise.update({
      where: { id },
      data: updateWorkoutExerciseDto,
    });
  }

  remove(id: number) {
    return this.prismaService.workoutExercise.delete({
      where: { id },
    });
  }
}
