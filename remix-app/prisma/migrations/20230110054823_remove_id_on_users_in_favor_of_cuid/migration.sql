/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "winelist" DROP CONSTRAINT "winelist_userid_fkey";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "PK_user",
DROP COLUMN "id",
ADD CONSTRAINT "PK_user" PRIMARY KEY ("cuid");

-- AlterTable
ALTER TABLE "winelist" ALTER COLUMN "userid" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "winelist" ADD CONSTRAINT "winelist_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("cuid") ON DELETE RESTRICT ON UPDATE NO ACTION;
