/*
  Warnings:

  - Added the required column `productId` to the `orderItens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orderItens" ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "orderItens" ADD CONSTRAINT "orderItens_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
