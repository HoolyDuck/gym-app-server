import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateWorkoutExerciseDto } from './dto/create-workout-exercise.dto';

@Controller('workout')
@UseGuards(JwtAuthGuard)
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @Post()
  create(
    @Body() createWorkoutDto: CreateWorkoutDto,
    @GetUser() user: UserEntity,
  ) {
    return this.workoutService.create(createWorkoutDto, user);
  }

  @Get()
  findAll() {
    return this.workoutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutService.findOne({ id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutService.update(+id, updateWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutService.remove(+id);
  }

  @Post(':id/exercise')
  addExerciseToWorkout(
    @Param('id') id: string,
    @Body() createWorkoutExerciseDto: CreateWorkoutExerciseDto,
  ) {
    return this.workoutService.addExerciseToWorkout(
      +id,
      createWorkoutExerciseDto,
    );
  }

  @Delete(':id/exercise/:exerciseId')
  removeExerciseFromWorkout(
    @Param('id') id: string,
    @Param('exerciseId') workoutExerciseId: string,
  ) {
    return this.workoutService.removeExerciseFromWorkout(
      +id,
      +workoutExerciseId,
    );
  }
}
