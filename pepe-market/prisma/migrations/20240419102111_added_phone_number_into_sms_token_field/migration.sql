/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `SMSToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `SMSToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SMSToken" ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SMSToken_phone_key" ON "SMSToken"("phone");
