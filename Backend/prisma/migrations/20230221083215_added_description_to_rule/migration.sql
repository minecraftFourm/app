/*
  Warnings:

  - You are about to drop the column `name` on the `Rule` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Rule` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `title` to the `Rule` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Rule_name_key";

-- AlterTable
ALTER TABLE "Rule" DROP COLUMN "name",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rule_title_key" ON "Rule"("title");
