-- CreateEnum
CREATE TYPE "Replay" AS ENUM ('ALL', 'WEEKDAYS', 'WEEKENDS', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY', 'EVERY_2_DAYS', 'EVERY_WEEK', 'EVERY_MONTH', 'EVERY_YEAR');

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "telegram_username" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "avatar" TEXT,
    "description" TEXT NOT NULL DEFAULT '',
    "balance" INTEGER NOT NULL DEFAULT 0,
    "streak" INTEGER NOT NULL DEFAULT 0,
    "tasks" INTEGER[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillCardSkin" (
    "id" SERIAL NOT NULL,
    "skinId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "quantityLeft" INTEGER NOT NULL,

    CONSTRAINT "SkillCardSkin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time" TIMESTAMP(3),
    "notification" TIMESTAMP(3),

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "skinId" INTEGER NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "streak" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "activePeriod" TIMESTAMP(3),
    "replay" "Replay",

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_username_key" ON "User"("telegram_username");

-- AddForeignKey
ALTER TABLE "SkillCardSkin" ADD CONSTRAINT "SkillCardSkin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
