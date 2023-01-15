/*
  Warnings:

  - You are about to drop the column `horario` on the `RefeicaoConsumo24h` table. All the data in the column will be lost.
  - Added the required column `medida` to the `RefeicaoConsumo24h` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `RefeicaoConsumo24h` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RefeicaoConsumo24h" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "alimentoTACOId" INTEGER NOT NULL,
    "alimentoPinheiroId" INTEGER NOT NULL,
    "tipoDeRefeicaoId" INTEGER NOT NULL,
    "medida" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "consumo24hId" INTEGER,
    CONSTRAINT "RefeicaoConsumo24h_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefeicaoConsumo24h_alimentoPinheiroId_fkey" FOREIGN KEY ("alimentoPinheiroId") REFERENCES "AlimentoPinheiro" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefeicaoConsumo24h_tipoDeRefeicaoId_fkey" FOREIGN KEY ("tipoDeRefeicaoId") REFERENCES "TipoDeRefeicao" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "RefeicaoConsumo24h_consumo24hId_fkey" FOREIGN KEY ("consumo24hId") REFERENCES "Consumo24h" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RefeicaoConsumo24h" ("alimentoPinheiroId", "alimentoTACOId", "consumo24hId", "id", "tipoDeRefeicaoId") SELECT "alimentoPinheiroId", "alimentoTACOId", "consumo24hId", "id", "tipoDeRefeicaoId" FROM "RefeicaoConsumo24h";
DROP TABLE "RefeicaoConsumo24h";
ALTER TABLE "new_RefeicaoConsumo24h" RENAME TO "RefeicaoConsumo24h";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
