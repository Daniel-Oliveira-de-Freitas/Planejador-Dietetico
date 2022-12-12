/*
 Warnings:
 
 - Added the required column `consumo24hId` to the `Paciente` table without a default value. This is not possible if the table is not empty.
 
 */
-- CreateTable
CREATE TABLE "Dieta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
);
-- CreateTable
Create Table CREATE TABLE "TipoDeRefeicao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);
-- CreateTable
CREATE TABLE "RefeicaoDieta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "consumo24hId" INTEGER,
    "alimentoTACOId" INTEGER NOT NULL,
    "alimentoPinheiroId" INTEGER NOT NULL,
    "tipoDeRefeicaoId" INTEGER NOT NULL,
    "horario" DATETIME NOT NULL,
    CONSTRAINT "RefeicaoDieta_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefeicaoDieta_alimentoPinheiroId_fkey" FOREIGN KEY ("alimentoPinheiroId") REFERENCES "AlimentoPinheiro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefeicaoDieta_consumo24hId_fkey" FOREIGN KEY ("consumo24hId") REFERENCES "Consumo24h" ("id") ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT "RefeicaoDieta_tipoDeRefeicaoId_fkey" FOREIGN KEY ("tipoDeRefeicaoId") REFERENCES "TipoDeRefeicao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
-- RedefineTables
PRAGMA foreign_keys = OFF;
CREATE TABLE "new_Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "consumoHabitualId" INTEGER,
    "habitosDeVidaId" INTEGER,
    "consumo24hId" INTEGER NOT NULL,
    CONSTRAINT "Paciente_consumoHabitualId_fkey" FOREIGN KEY ("consumoHabitualId") REFERENCES "ConsumoHabitual" ("id") ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT "Paciente_habitosDeVidaId_fkey" FOREIGN KEY ("habitosDeVidaId") REFERENCES "HabitosDeVida" ("id") ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT "Paciente_consumo24hId_fkey" FOREIGN KEY ("consumo24hId") REFERENCES "Consumo24h" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Paciente" (
        "consumoHabitualId",
        "habitosDeVidaId",
        "id",
        "nome"
    )
SELECT "consumoHabitualId",
    "habitosDeVidaId",
    "id",
    "nome"
FROM "Paciente";
DROP TABLE "Paciente";
ALTER TABLE "new_Paciente"
    RENAME TO "Paciente";
PRAGMA foreign_key_check;
PRAGMA foreign_keys = ON;