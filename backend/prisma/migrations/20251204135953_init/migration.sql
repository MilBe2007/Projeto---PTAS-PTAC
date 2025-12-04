/*
  Warnings:

  - You are about to alter the column `codigo` on the `Mesa` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `mesa_id` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `n_pessoas` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Reserva` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `Reserva` table. All the data in the column will be lost.
  - Added the required column `mesaId` to the `Reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Reserva` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Mesa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "codigo" INTEGER NOT NULL,
    "n_lugares" INTEGER NOT NULL
);
INSERT INTO "new_Mesa" ("codigo", "id", "n_lugares") SELECT "codigo", "id", "n_lugares" FROM "Mesa";
DROP TABLE "Mesa";
ALTER TABLE "new_Mesa" RENAME TO "Mesa";
CREATE UNIQUE INDEX "Mesa_codigo_key" ON "Mesa"("codigo");
CREATE TABLE "new_Reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "data" DATETIME NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "mesaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Reserva_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reserva_mesaId_fkey" FOREIGN KEY ("mesaId") REFERENCES "Mesa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Reserva" ("data", "id") SELECT "data", "id" FROM "Reserva";
DROP TABLE "Reserva";
ALTER TABLE "new_Reserva" RENAME TO "Reserva";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
