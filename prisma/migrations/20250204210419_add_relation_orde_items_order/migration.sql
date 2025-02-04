/*
  Warnings:

  - Added the required column `orderId` to the `orderItens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderItens" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "orderItens" ADD CONSTRAINT "orderItens_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
