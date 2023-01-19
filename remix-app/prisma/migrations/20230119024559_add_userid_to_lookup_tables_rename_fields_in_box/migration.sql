/*
  Warnings:

  - You are about to drop the column `boxno` on the `box` table. All the data in the column will be lost.
  - You are about to drop the column `no` on the `location` table. All the data in the column will be lost.
  - Added the required column `identifier` to the `box` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userid` to the `box` table without a default value. This is not possible if the table is not empty.
  - Made the column `wineid` on table `location` required. This step will fail if there are existing NULL values in that column.
  - Made the column `boxid` on table `location` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "box" DROP COLUMN "boxno",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "identifier" TEXT NOT NULL,
ADD COLUMN     "userid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "location" DROP COLUMN "no",
ADD COLUMN     "number" INTEGER,
ALTER COLUMN "wineid" SET NOT NULL,
ALTER COLUMN "boxid" SET NOT NULL;

-- AlterTable
ALTER TABLE "region" ADD COLUMN     "userid" TEXT;

-- AlterTable
ALTER TABLE "vineyard" ADD COLUMN     "userid" TEXT;

-- AlterTable
ALTER TABLE "winetype" ADD COLUMN     "userid" TEXT;

-- CreateIndex
CREATE INDEX "box_userid_fk" ON "box"("userid");

-- CreateIndex
CREATE INDEX "region_userid_fk" ON "region"("userid");

-- CreateIndex
CREATE INDEX "vineyard_userid_fk" ON "vineyard"("userid");

-- CreateIndex
CREATE INDEX "winetype_userid_fk" ON "winetype"("userid");

-- AddForeignKey
ALTER TABLE "box" ADD CONSTRAINT "box_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "region" ADD CONSTRAINT "region_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vineyard" ADD CONSTRAINT "vineyard_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "winetype" ADD CONSTRAINT "winetype_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
