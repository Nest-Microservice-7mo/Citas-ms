-- CreateTable
CREATE TABLE "Cita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCliente" INTEGER NOT NULL,
    "idEmpleada" INTEGER NOT NULL,
    "fechaCita" DATETIME NOT NULL,
    "horaCita" TEXT NOT NULL,
    "duracionCita" TEXT NOT NULL,
    "costoCita" REAL NOT NULL,
    "observacionesCita" TEXT NOT NULL,
    "estadoCita" TEXT NOT NULL
);
