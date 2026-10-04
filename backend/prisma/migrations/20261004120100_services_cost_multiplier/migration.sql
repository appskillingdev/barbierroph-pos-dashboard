-- 10/03 revision: cost_id is always an inventory product, so cost_category
-- leaves the primary key; multiplier scales the product cost per service.

-- AlterTable
ALTER TABLE "bph_services_cost" DROP CONSTRAINT "bph_services_cost_pkey",
ADD COLUMN     "multiplier" INTEGER,
ADD CONSTRAINT "bph_services_cost_pkey" PRIMARY KEY ("service_code", "item_number", "cost_id");
