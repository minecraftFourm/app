/*
  Warnings:

  - The primary key for the `Follower` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Follower` table. All the data in the column will be lost.
  - Added the required column `refer` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_pkey",
DROP COLUMN "id",
ADD COLUMN     "refer" TEXT NOT NULL,
ADD CONSTRAINT "Follower_pkey" PRIMARY KEY ("userId", "refer");

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_refer_fkey" FOREIGN KEY ("refer") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
