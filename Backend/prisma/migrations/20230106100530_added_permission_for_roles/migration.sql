-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "canCreateRole" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canDeleteRole" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canEditRole" BOOLEAN NOT NULL DEFAULT false;
