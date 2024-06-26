import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExerciseService {
  constructor(private prismaService: PrismaService) {}

  create(createExerciseDto: CreateExerciseDto) {
    return this.prismaService.exercise.create({
      data: createExerciseDto,
    });
  }

  findAll() {
    return this.prismaService.exercise.findMany();
  }

  findOne(params: Prisma.ExerciseWhereUniqueInput) {
    return this.prismaService.exercise.findFirst({
      where: params,
    });
  }

  update(
    id: number,
    updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.prismaService.exercise.update({
      where: { id },
      data: updateExerciseDto,
    });
  }

  remove(id: number) {
    return this.prismaService.exercise.delete({
      where: { id },
    });
  }
}
