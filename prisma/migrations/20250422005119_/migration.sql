/*
  Warnings:

  - You are about to drop the column `DateSubmitted` on the `Report` table. All the data in the column will be lost.
  - Added the required column `reason` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Reason" AS ENUM ('Innapropriate', 'Disgusting', 'Expensive');

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "DateSubmitted",
ADD COLUMN     "reason" "Reason" NOT NULL;
