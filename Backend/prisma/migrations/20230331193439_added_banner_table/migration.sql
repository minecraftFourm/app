/*
  Warnings:

  - You are about to drop the column `banner` on the `User` table. All the data in the column will be lost.
  - Added the required column `bannnerId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "banner",
ADD COLUMN     "bannnerId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Banner" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_bannnerId_fkey" FOREIGN KEY ("bannnerId") REFERENCES "Banner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
