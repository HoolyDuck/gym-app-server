/*
  Warnings:

  - The primary key for the `WorkoutExercise` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `order` on the `WorkoutExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutExercise" DROP CONSTRAINT "WorkoutExercise_pkey",
DROP COLUMN "id",
DROP COLUMN "order",
ADD CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("workoutId", "exerciseId");
