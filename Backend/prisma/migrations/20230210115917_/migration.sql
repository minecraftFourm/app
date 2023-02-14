-- CreateTable
CREATE TABLE "Setting" (
    "serverName" TEXT NOT NULL DEFAULT 'My Server',
    "infoBar" TEXT,
    "maintenance" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("serverName")
);
