/*
  Warnings:

  - The primary key for the `box` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `box` on the `location` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "location" DROP CONSTRAINT "location_box_fkey";

-- DropIndex
DROP INDEX "location_box_fk";

-- AlterTable
ALTER TABLE "box" DROP CONSTRAINT "box_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PK_box" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "location" DROP COLUMN "box",
ADD COLUMN     "boxid" INTEGER;

-- CreateIndex
CREATE INDEX "location_boxid_fk" ON "location"("boxid");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_boxid_fkey" FOREIGN KEY ("boxid") REFERENCES "box"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
