-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "mainCategoryId" TEXT;

-- CreateTable
CREATE TABLE "MainCategory" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "MainCategory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_mainCategoryId_fkey" FOREIGN KEY ("mainCategoryId") REFERENCES "MainCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
