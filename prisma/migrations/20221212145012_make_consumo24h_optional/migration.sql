-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "consumoHabitualId" INTEGER,
    "habitosDeVidaId" INTEGER,
    "consumo24hId" INTEGER,
    CONSTRAINT "Paciente_consumoHabitualId_fkey" FOREIGN KEY ("consumoHabitualId") REFERENCES "ConsumoHabitual" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Paciente_habitosDeVidaId_fkey" FOREIGN KEY ("habitosDeVidaId") REFERENCES "HabitosDeVida" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Paciente_consumo24hId_fkey" FOREIGN KEY ("consumo24hId") REFERENCES "Consumo24h" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Paciente" ("consumo24hId", "consumoHabitualId", "habitosDeVidaId", "id", "nome") SELECT "consumo24hId", "consumoHabitualId", "habitosDeVidaId", "id", "nome" FROM "Paciente";
DROP TABLE "Paciente";
ALTER TABLE "new_Paciente" RENAME TO "Paciente";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
