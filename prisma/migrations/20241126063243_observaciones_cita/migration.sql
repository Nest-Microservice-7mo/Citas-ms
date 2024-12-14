-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCliente" INTEGER NOT NULL,
    "idEmpleada" INTEGER NOT NULL,
    "fechaCita" DATETIME NOT NULL,
    "horaCita" TEXT NOT NULL,
    "duracionCita" TEXT NOT NULL,
    "costoCita" REAL NOT NULL,
    "observacionesCita" TEXT NOT NULL DEFAULT '',
    "estadoCita" TEXT NOT NULL
);
INSERT INTO "new_Cita" ("costoCita", "duracionCita", "estadoCita", "fechaCita", "horaCita", "id", "idCliente", "idEmpleada", "observacionesCita") SELECT "costoCita", "duracionCita", "estadoCita", "fechaCita", "horaCita", "id", "idCliente", "idEmpleada", "observacionesCita" FROM "Cita";
DROP TABLE "Cita";
ALTER TABLE "new_Cita" RENAME TO "Cita";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
