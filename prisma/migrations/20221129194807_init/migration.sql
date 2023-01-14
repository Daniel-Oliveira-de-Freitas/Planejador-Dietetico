-- CreateTable
CREATE TABLE "Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "idade" NUMBER NOT NULL,
    "sexo" TEXT NOT NULL,
    "peso" REAL NOT NULL,
    "altura" REAL NOT NULL
);
