-- AlterTable
ALTER TABLE "User" ADD COLUMN     "discord" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "instagram" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "mc_username" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "showMail" BOOLEAN NOT NULL DEFAULT true;