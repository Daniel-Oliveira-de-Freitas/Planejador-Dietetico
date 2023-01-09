-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Fiber" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Fiber_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Fiber" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Fiber";
DROP TABLE "Fiber";
ALTER TABLE "new_Fiber" RENAME TO "Fiber";
CREATE TABLE "new_Iron" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Iron_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Iron" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Iron";
DROP TABLE "Iron";
ALTER TABLE "new_Iron" RENAME TO "Iron";
CREATE TABLE "new_Calcium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Calcium_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Calcium" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Calcium";
DROP TABLE "Calcium";
ALTER TABLE "new_Calcium" RENAME TO "Calcium";
CREATE TABLE "new_Monounsaturated" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Monounsaturated_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Monounsaturated" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Monounsaturated";
DROP TABLE "Monounsaturated";
ALTER TABLE "new_Monounsaturated" RENAME TO "Monounsaturated";
CREATE TABLE "new_Energy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kcal" REAL,
    "kj" REAL,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Energy_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Energy" ("alimentoTACOId", "id", "kcal", "kj") SELECT "alimentoTACOId", "id", "kcal", "kj" FROM "Energy";
DROP TABLE "Energy";
ALTER TABLE "new_Energy" RENAME TO "Energy";
CREATE TABLE "new_Riboflavin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Riboflavin_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Riboflavin" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Riboflavin";
DROP TABLE "Riboflavin";
ALTER TABLE "new_Riboflavin" RENAME TO "Riboflavin";
CREATE TABLE "new_Potassium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Potassium_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Potassium" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Potassium";
DROP TABLE "Potassium";
ALTER TABLE "new_Potassium" RENAME TO "Potassium";
CREATE TABLE "new_Lipid" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Lipid_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lipid" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Lipid";
DROP TABLE "Lipid";
ALTER TABLE "new_Lipid" RENAME TO "Lipid";
CREATE TABLE "new_Retinol" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Retinol_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Retinol" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Retinol";
DROP TABLE "Retinol";
ALTER TABLE "new_Retinol" RENAME TO "Retinol";
CREATE TABLE "new_Ashes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Ashes_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Ashes" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Ashes";
DROP TABLE "Ashes";
ALTER TABLE "new_Ashes" RENAME TO "Ashes";
CREATE TABLE "new_Phosphorus" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Phosphorus_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Phosphorus" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Phosphorus";
DROP TABLE "Phosphorus";
ALTER TABLE "new_Phosphorus" RENAME TO "Phosphorus";
CREATE TABLE "new_Saturated" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Saturated_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Saturated" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Saturated";
DROP TABLE "Saturated";
ALTER TABLE "new_Saturated" RENAME TO "Saturated";
CREATE TABLE "new_Polyunsaturated" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Polyunsaturated_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Polyunsaturated" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Polyunsaturated";
DROP TABLE "Polyunsaturated";
ALTER TABLE "new_Polyunsaturated" RENAME TO "Polyunsaturated";
CREATE TABLE "new_Thiamine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Thiamine_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Thiamine" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Thiamine";
DROP TABLE "Thiamine";
ALTER TABLE "new_Thiamine" RENAME TO "Thiamine";
CREATE TABLE "new_Manganese" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Manganese_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Manganese" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Manganese";
DROP TABLE "Manganese";
ALTER TABLE "new_Manganese" RENAME TO "Manganese";
CREATE TABLE "new_Pyridoxine" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Pyridoxine_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Pyridoxine" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Pyridoxine";
DROP TABLE "Pyridoxine";
ALTER TABLE "new_Pyridoxine" RENAME TO "Pyridoxine";
CREATE TABLE "new_Sodium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Sodium_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Sodium" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Sodium";
DROP TABLE "Sodium";
ALTER TABLE "new_Sodium" RENAME TO "Sodium";
CREATE TABLE "new_Carbohydrate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Carbohydrate_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Carbohydrate" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Carbohydrate";
DROP TABLE "Carbohydrate";
ALTER TABLE "new_Carbohydrate" RENAME TO "Carbohydrate";
CREATE TABLE "new_Humidity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Humidity_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Humidity" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Humidity";
DROP TABLE "Humidity";
ALTER TABLE "new_Humidity" RENAME TO "Humidity";
CREATE TABLE "new_Cholesterol" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Cholesterol_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Cholesterol" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Cholesterol";
DROP TABLE "Cholesterol";
ALTER TABLE "new_Cholesterol" RENAME TO "Cholesterol";
CREATE TABLE "new_Copper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Copper_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Copper" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Copper";
DROP TABLE "Copper";
ALTER TABLE "new_Copper" RENAME TO "Copper";
CREATE TABLE "new_Magnesium" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Magnesium_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Magnesium" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Magnesium";
DROP TABLE "Magnesium";
ALTER TABLE "new_Magnesium" RENAME TO "Magnesium";
CREATE TABLE "new_Zinc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Zinc_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Zinc" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Zinc";
DROP TABLE "Zinc";
ALTER TABLE "new_Zinc" RENAME TO "Zinc";
CREATE TABLE "new_Protein" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Protein_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Protein" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Protein";
DROP TABLE "Protein";
ALTER TABLE "new_Protein" RENAME TO "Protein";
CREATE TABLE "new_Niacin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "qty" REAL,
    "unit" TEXT,
    "alimentoTACOId" INTEGER NOT NULL,
    CONSTRAINT "Niacin_alimentoTACOId_fkey" FOREIGN KEY ("alimentoTACOId") REFERENCES "AlimentoTACO" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Niacin" ("alimentoTACOId", "id", "qty", "unit") SELECT "alimentoTACOId", "id", "qty", "unit" FROM "Niacin";
DROP TABLE "Niacin";
ALTER TABLE "new_Niacin" RENAME TO "Niacin";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
