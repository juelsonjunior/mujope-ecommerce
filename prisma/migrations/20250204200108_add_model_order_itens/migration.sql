-- CreateTable
CREATE TABLE "orderItens" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "orderItens_pkey" PRIMARY KEY ("id")
);
