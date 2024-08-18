/*
  Warnings:

  - You are about to drop the column `debuffs` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `debuffs_limit` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skills_limit` on the `User` table. All the data in the column will be lost.
  - Added the required column `quantity` to the `SkillCardSkin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityLeft` to the `SkillCardSkin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SkillCardSkin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE skillcardskin_id_seq;
ALTER TABLE "SkillCardSkin" ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "quantityLeft" INTEGER NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('skillcardskin_id_seq');
ALTER SEQUENCE skillcardskin_id_seq OWNED BY "SkillCardSkin"."id";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "debuffs",
DROP COLUMN "debuffs_limit",
DROP COLUMN "skills_limit";

-- AddForeignKey
ALTER TABLE "SkillCardSkin" ADD CONSTRAINT "SkillCardSkin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
