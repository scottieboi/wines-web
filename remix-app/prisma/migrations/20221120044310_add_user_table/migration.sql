/*
  Warnings:

  - Added the required column `userid` to the `winelist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "winelist" ADD COLUMN     "userid" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "cuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,

    CONSTRAINT "PK_user" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE INDEX "winelist_userid_fk" ON "winelist"("userid");

-- AddForeignKey
ALTER TABLE "winelist" ADD CONSTRAINT "winelist_userid_fkey" FOREIGN KEY ("userid") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;
