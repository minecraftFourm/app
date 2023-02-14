-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "AnnouncementComments" DROP CONSTRAINT "AnnouncementComments_announcementId_fkey";

-- AddForeignKey
ALTER TABLE "Announcement" ADD CONSTRAINT "Announcement_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnouncementComments" ADD CONSTRAINT "AnnouncementComments_announcementId_fkey" FOREIGN KEY ("announcementId") REFERENCES "Announcement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
