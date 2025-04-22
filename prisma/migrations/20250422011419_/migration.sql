/*
  Warnings:

  - Added the required column `owner` to the `UserReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserReport" ADD COLUMN     "owner" TEXT NOT NULL;
