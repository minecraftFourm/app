/*
  Warnings:

  - You are about to drop the column `bannnerId` on the `User` table. All the data in the column will be lost.
  - Added the required column `bannerId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_bannnerId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bannnerId",
ADD COLUMN     "bannerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bannerId_fkey" FOREIGN KEY ("bannerId") REFERENCES "Banner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
