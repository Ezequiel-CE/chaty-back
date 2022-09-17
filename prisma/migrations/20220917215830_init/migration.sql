/*
  Warnings:

  - You are about to drop the column `mail` on the `Room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Room_mail_key` ON `Room`;

-- AlterTable
ALTER TABLE `Room` DROP COLUMN `mail`,
    ADD COLUMN `name` VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Room_name_key` ON `Room`(`name`);