-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "yourname" TEXT NOT NULL,
    "criminal" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "DateSubmitted" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);
