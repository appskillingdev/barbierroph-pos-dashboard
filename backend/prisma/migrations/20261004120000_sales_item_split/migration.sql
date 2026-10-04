-- 10/03 revision: split bph_sales into header (bph_sales) + line items (bph_sales_item).
-- barber_id / service_code move from the sale header to its line items.

-- CreateTable
CREATE TABLE "bph_sales_item" (
    "transaction_id" TEXT NOT NULL,
    "item_number" TEXT NOT NULL,
    "service_code" TEXT NOT NULL,
    "barber_id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "bph_sales_item_pkey" PRIMARY KEY ("transaction_id","item_number")
);

-- Backfill: every existing bph_sales row becomes one line item of its transaction
INSERT INTO "bph_sales_item" ("transaction_id", "item_number", "service_code", "barber_id", "amount")
SELECT
    "transaction_id",
    LPAD(ROW_NUMBER() OVER (PARTITION BY "transaction_id" ORDER BY "transaction_date", "barber_id", "service_code")::TEXT, 2, '0'),
    "service_code",
    "barber_id",
    "total_amount"
FROM "bph_sales";

-- Collapse transactions that were stored as several rows into a single header
UPDATE "bph_sales" s
SET "total_amount" = t."total"
FROM (
    SELECT "transaction_id", SUM("total_amount") AS "total"
    FROM "bph_sales"
    GROUP BY "transaction_id"
    HAVING COUNT(*) > 1
) t
WHERE s."transaction_id" = t."transaction_id";

DELETE FROM "bph_sales" s
USING (
    SELECT ctid, ROW_NUMBER() OVER (PARTITION BY "transaction_id" ORDER BY "transaction_date", "barber_id", "service_code") AS "rn"
    FROM "bph_sales"
) d
WHERE s.ctid = d.ctid AND d."rn" > 1;

-- DropForeignKey
ALTER TABLE "bph_sales" DROP CONSTRAINT "bph_sales_barber_id_fkey";

-- DropForeignKey
ALTER TABLE "bph_sales" DROP CONSTRAINT "bph_sales_service_code_fkey";

-- AlterTable
ALTER TABLE "bph_sales" DROP CONSTRAINT "bph_sales_pkey",
DROP COLUMN "barber_id",
DROP COLUMN "service_code",
ADD COLUMN     "remarks" TEXT,
ADD CONSTRAINT "bph_sales_pkey" PRIMARY KEY ("transaction_id", "transaction_date", "customer_id", "branch_id");

-- CreateIndex
CREATE UNIQUE INDEX "bph_sales_transaction_id_key" ON "bph_sales"("transaction_id");

-- AddForeignKey
ALTER TABLE "bph_sales_item" ADD CONSTRAINT "bph_sales_item_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "bph_sales"("transaction_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bph_sales_item" ADD CONSTRAINT "bph_sales_item_service_code_fkey" FOREIGN KEY ("service_code") REFERENCES "bph_services"("service_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bph_sales_item" ADD CONSTRAINT "bph_sales_item_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "bph_barbers"("barber_id") ON DELETE RESTRICT ON UPDATE CASCADE;
