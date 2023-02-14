/*
  Warnings:

  - You are about to drop the column `content` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the `Announcement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnnouncementComments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommentsOnPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `comment` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Announcement" DROP CONSTRAINT "Announcement_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "AnnouncementComments" DROP CONSTRAINT "AnnouncementComments_announcementId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "CommentsOnPost" DROP CONSTRAINT "CommentsOnPost_commendId_fkey";

-- DropForeignKey
ALTER TABLE "CommentsOnPost" DROP CONSTRAINT "CommentsOnPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_ownerId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "content",
DROP COLUMN "created",
DROP COLUMN "ownerId",
DROP COLUMN "updated",
ADD COLUMN     "comment" TEXT NOT NULL,
ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Announcement";

-- DropTable
DROP TABLE "AnnouncementComments";

-- DropTable
DROP TABLE "CommentsOnPost";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_postId_key" ON "Category"("postId");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
