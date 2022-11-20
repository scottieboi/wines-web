/*
  Warnings:

  - A unique constraint covering the columns `[region]` on the table `region` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vineyard]` on the table `vineyard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[winetype]` on the table `winetype` will be added. If there are existing duplicate values, this will fail.
  - Made the column `region` on table `region` required. This step will fail if there are existing NULL values in that column.
  - Made the column `vineyard` on table `vineyard` required. This step will fail if there are existing NULL values in that column.
  - Made the column `winetype` on table `winetype` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "region" ALTER COLUMN "region" SET NOT NULL;

-- AlterTable
ALTER TABLE "vineyard" ALTER COLUMN "vineyard" SET NOT NULL;

-- AlterTable
ALTER TABLE "winetype" ALTER COLUMN "winetype" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "region_region_key" ON "region"("region");

-- CreateIndex
CREATE UNIQUE INDEX "vineyard_vineyard_key" ON "vineyard"("vineyard");

-- CreateIndex
CREATE UNIQUE INDEX "winetype_winetype_key" ON "winetype"("winetype");
