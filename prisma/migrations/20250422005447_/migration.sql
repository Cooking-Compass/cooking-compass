/*
  Warnings:

  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Report";

-- CreateTable
CREATE TABLE "UserReport" (
    "id" SERIAL NOT NULL,
    "yourname" TEXT NOT NULL,
    "criminal" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "reason" "Reason" NOT NULL,

    CONSTRAINT "UserReport_pkey" PRIMARY KEY ("id")
);
