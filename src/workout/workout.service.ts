import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class WorkoutService {
  constructor(private prismaService: PrismaService) {}

  create(createWorkoutDto: CreateWorkoutDto) {
    return this.prismaService.workout.create({
      data: createWorkoutDto,
    });
  }

  findAll() {
    return this.prismaService.workout.findMany({
      include: {
        workoutExercises: true,
      },
    });
  }

  findOne(params: Prisma.WorkoutWhereUniqueInput) {
    return this.prismaService.workout.findUnique({
      where: params,
      include: {
        workoutExercises: true,
      },
    });
  }

  update(
    params: Prisma.WorkoutWhereUniqueInput,
    updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return this.prismaService.workout.update({
      where: params,
      data: updateWorkoutDto,
    });
  }

  remove(params: Prisma.WorkoutWhereUniqueInput) {
    return this.prismaService.workout.delete({
      where: params,
    });
  }
}
