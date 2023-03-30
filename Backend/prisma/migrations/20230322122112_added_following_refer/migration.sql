/*
  Warnings:

  - Added the required column `refer` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Following" ADD COLUMN     "refer" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Following" ADD CONSTRAINT "Following_refer_fkey" FOREIGN KEY ("refer") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
