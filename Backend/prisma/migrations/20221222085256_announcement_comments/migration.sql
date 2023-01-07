/*
  Warnings:

  - The primary key for the `CommentsOnPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `announcementId` on the `CommentsOnPost` table. All the data in the column will be lost.
  - The required column `id` was added to the `CommentsOnPost` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "CommentsOnPost" DROP CONSTRAINT "CommentsOnPost_announcementId_fkey";

-- AlterTable
ALTER TABLE "CommentsOnPost" DROP CONSTRAINT "CommentsOnPost_pkey",
DROP COLUMN "announcementId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "CommentsOnPost_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "CommentsOnAnnouncement" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "announcementId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommentsOnAnnouncement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CommentsOnAnnouncement" ADD CONSTRAINT "CommentsOnAnnouncement_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
