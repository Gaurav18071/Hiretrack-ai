-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "resumeFileName" TEXT,
ADD COLUMN     "resumeMimeType" TEXT,
ADD COLUMN     "resumeUploadedAt" TIMESTAMP(3);
