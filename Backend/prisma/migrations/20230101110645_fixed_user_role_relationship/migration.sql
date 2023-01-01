/*
  Warnings:

  - You are about to drop the column `userId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_userId_fkey";

-- DropIndex
DROP INDEX "Role_userId_key";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roleId" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
