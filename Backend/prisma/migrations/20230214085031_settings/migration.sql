/*
  Warnings:

  - You are about to drop the column `infoBar` on the `Setting` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serverName]` on the table `Setting` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `infobar` to the `Setting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Setting" DROP COLUMN "infoBar",
ADD COLUMN     "infobar" TEXT NOT NULL,
ALTER COLUMN "serverName" DROP DEFAULT,
ALTER COLUMN "maintenance" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Setting_serverName_key" ON "Setting"("serverName");
