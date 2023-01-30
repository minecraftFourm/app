/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Stats` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updated` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Stats" DROP CONSTRAINT "Stats_userId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role";

-- DropTable
DROP TABLE "Stats";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "canPostAdmin" BOOLEAN NOT NULL DEFAULT false,
    "canEditAdmin" BOOLEAN NOT NULL DEFAULT false,
    "canManageUsers" BOOLEAN NOT NULL DEFAULT false,
    "canRemoveUsers" BOOLEAN NOT NULL DEFAULT false,
    "canEditUsers" BOOLEAN NOT NULL DEFAULT false,
    "canCreateCategory" BOOLEAN NOT NULL DEFAULT false,
    "canEditCategory" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteCategory" BOOLEAN NOT NULL DEFAULT false,
    "canCreatePost" BOOLEAN NOT NULL DEFAULT false,
    "canEditPost" BOOLEAN NOT NULL DEFAULT false,
    "canDeletePost" BOOLEAN NOT NULL DEFAULT false,
    "canEditOtherPost" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteOtherPost" BOOLEAN NOT NULL DEFAULT false,
    "canCreateComment" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteComment" BOOLEAN NOT NULL DEFAULT false,
    "canEditComment" BOOLEAN NOT NULL DEFAULT false,
    "canDeleteOtherComment" BOOLEAN NOT NULL DEFAULT false,
    "canEditOtherComment" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follower" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Following" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Following_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_userId_key" ON "Role"("userId");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
