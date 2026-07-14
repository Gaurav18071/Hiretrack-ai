-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "minimumEducation" TEXT,
ADD COLUMN     "minimumExperience" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "preferredSkills" TEXT[],
ADD COLUMN     "requiredSkills" TEXT[];
