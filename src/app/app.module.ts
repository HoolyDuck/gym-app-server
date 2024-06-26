import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import config from 'src/config/config';
import { WorkoutModule } from 'src/workout/workout.module';
import { ExerciseModule } from 'src/exercise/exercise.module';
import { WorkoutExerciseModule } from 'src/workout-exercise/workout-exercise.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      load: [config],
    }),
    AuthModule,
    WorkoutModule,
    ExerciseModule,
    WorkoutExerciseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
