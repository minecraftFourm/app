/*
  Warnings:

  - You are about to drop the `CommentsOnAnnouncement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommentsOnAnnouncement" DROP CONSTRAINT "CommentsOnAnnouncement_announcementId_fkey";

-- AlterTable
ALTER TABLE "Announcement" ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "CommentsOnAnnouncement";

-- CreateTable
CREATE TABLE "AnnouncementComments" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "announcementId" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnnouncementComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnnouncementComments" ADD CONSTRAINT "AnnouncementComments_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
