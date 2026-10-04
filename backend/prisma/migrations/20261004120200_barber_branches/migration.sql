-- 10/03 revision: barbers get date_availability and can be assigned to
-- multiple branches through bph_barber_branches. bph_barbers.branch_id is
-- kept (not dropped) so existing single-branch readers keep working.

-- AlterTable
ALTER TABLE "bph_barbers" ADD COLUMN     "date_availability" TEXT;

-- CreateTable
CREATE TABLE "bph_barber_branches" (
    "barber_id" TEXT NOT NULL,
    "branch_id" TEXT NOT NULL,

    CONSTRAINT "bph_barber_branches_pkey" PRIMARY KEY ("barber_id","branch_id")
);

-- Backfill: each barber's current branch becomes its first assignment
INSERT INTO "bph_barber_branches" ("barber_id", "branch_id")
SELECT "barber_id", "branch_id" FROM "bph_barbers" WHERE "branch_id" IS NOT NULL;

-- AddForeignKey
ALTER TABLE "bph_barber_branches" ADD CONSTRAINT "bph_barber_branches_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "bph_barbers"("barber_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bph_barber_branches" ADD CONSTRAINT "bph_barber_branches_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "bph_branches"("branch_id") ON DELETE CASCADE ON UPDATE CASCADE;
