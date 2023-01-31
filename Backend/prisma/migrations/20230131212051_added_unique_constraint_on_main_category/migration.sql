/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `MainCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[priority]` on the table `MainCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MainCategory" ALTER COLUMN "priority" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "MainCategory_title_key" ON "MainCategory"("title");

-- CreateIndex
CREATE UNIQUE INDEX "MainCategory_priority_key" ON "MainCategory"("priority");
