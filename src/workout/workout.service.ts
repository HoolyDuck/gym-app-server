import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';

@Injectable()
export class WorkoutService {
  constructor(private prismaService: PrismaService) {}

  create(createWorkoutDto: CreateWorkoutDto, user: User) {
    return this.prismaService.workout.create({
      data: {
        ...createWorkoutDto,
        userId: user.id,
      },
    });
  }

  findAll() {
    return this.prismaService.workout.findMany({
      include: {
        workoutExercises: {
          include: {
            exercise: true,
          },
        },
      },
    });
  }

  findOne(params: Prisma.WorkoutWhereUniqueInput) {
    return this.prismaService.workout.findUnique({
      where: params,
      include: {
        workoutExercises: {
          include: {
            exercise: true,
          },
        },
      },
    });
  }

  update(id: number, updateWorkoutDto: UpdateWorkoutDto) {
    return this.prismaService.workout.update({
      where: { id },
      data: updateWorkoutDto,
    });
  }

  remove(id: number) {
    return this.prismaService.workout.delete({
      where: { id },
    });
  }

  async addExerciseToWorkout(
    workoutId: number,
    createWorkoutExerciseDto: CreateWorkoutExerciseDto,
  ) {
    return this.prismaService.workoutExercise.create({
      data: {
        workoutId,
        ...createWorkoutExerciseDto,
      },
    });
  }

  async removeExerciseFromWorkout(workoutId: number, exerciseId: number) {
    return this.prismaService.workoutExercise.delete({
      where: {
        workoutExerciseId: {
          workoutId,
          exerciseId,
        },
      },
    });
  }
}
