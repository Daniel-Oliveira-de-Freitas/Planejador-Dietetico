/*
  Warnings:

  - You are about to drop the column `name` on the `Paciente` table. All the data in the column will be lost.
  - Added the required column `nome` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "ConsumoHabitual" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "acucar" BOOLEAN,
    "adocante" BOOLEAN,
    "frituras" BOOLEAN,
    "carneComGordura" BOOLEAN,
    "coposDeAgua" INTEGER,
    "latasDeOleo" INTEGER,
    "numeroDePessoas" INTEGER,
    "localDoAlmoco" TEXT,
    "localDaJanta" TEXT,
    "quemPrepara" TEXT
);

-- CreateTable
CREATE TABLE "HabitosDeVida" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "realizaAtividadeFisica" BOOLEAN,
    "nomeDaAtividade" TEXT,
    "frequenciaDaAtividade" TEXT,
    "pessoaFumante" BOOLEAN,
    "frequenciaFumo" TEXT,
    "consomeAlcool" BOOLEAN,
    "frequenciaAlcool" TEXT
);

-- CreateTable
CREATE TABLE "AlimentoPinheiro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "MeasurePinheiro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL,
    "qty" REAL NOT NULL,
    "alimentoPinheiroId" INTEGER,
    CONSTRAINT "MeasurePinheiro_alimentoPinheiroId_fkey" FOREIGN KEY ("alimentoPinheiroId") REFERENCES "AlimentoPinheiro" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "consumoHabitualId" INTEGER,
    "habitosDeVidaId" INTEGER,
    CONSTRAINT "Paciente_consumoHabitualId_fkey" FOREIGN KEY ("consumoHabitualId") REFERENCES "ConsumoHabitual" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Paciente_habitosDeVidaId_fkey" FOREIGN KEY ("habitosDeVidaId") REFERENCES "HabitosDeVida" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Paciente" ("id") SELECT "id" FROM "Paciente";
DROP TABLE "Paciente";
ALTER TABLE "new_Paciente" RENAME TO "Paciente";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
