-- CreateTable
CREATE TABLE "bph_sales" (
    "transaction_id" TEXT NOT NULL,
    "transaction_date" DATE NOT NULL,
    "customer_id" TEXT NOT NULL,
    "branch_id" TEXT NOT NULL,
    "barber_id" TEXT NOT NULL,
    "service_code" TEXT NOT NULL,
    "total_amount" DECIMAL(65,30) NOT NULL,
    "payment_method" TEXT NOT NULL,
    "reference_no" TEXT,
    "count_1" INTEGER,
    "count_5" INTEGER,
    "count_10" INTEGER,
    "count_20" INTEGER,
    "count_50" INTEGER,
    "count_100" INTEGER,
    "count_200" INTEGER,
    "count_500" INTEGER,
    "count_1000" INTEGER,
    "created_by" TEXT,

    CONSTRAINT "bph_sales_pkey" PRIMARY KEY ("transaction_id","transaction_date","customer_id","branch_id","barber_id","service_code")
);

-- CreateTable
CREATE TABLE "bph_services" (
    "service_code" TEXT NOT NULL,
    "category" TEXT,
    "cluster" TEXT,
    "service_name" TEXT NOT NULL,
    "service_description" TEXT,
    "service_amount" DECIMAL(65,30) NOT NULL,
    "icon" BYTEA,
    "is_promo" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "bph_services_pkey" PRIMARY KEY ("service_code")
);

-- CreateTable
CREATE TABLE "bph_services_cost" (
    "service_code" TEXT NOT NULL,
    "item_number" TEXT NOT NULL,
    "cost_category" TEXT NOT NULL,
    "cost_id" TEXT NOT NULL,

    CONSTRAINT "bph_services_cost_pkey" PRIMARY KEY ("service_code","item_number","cost_category","cost_id")
);

-- CreateTable
CREATE TABLE "bph_branches" (
    "branch_id" TEXT NOT NULL,
    "branch_owner" TEXT NOT NULL,
    "established_at" DATE NOT NULL,
    "branch_location" TEXT NOT NULL,
    "branch_address" TEXT NOT NULL,
    "branch_image" BYTEA,
    "social_media" TEXT,

    CONSTRAINT "bph_branches_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "bph_users" (
    "ID" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email_address" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "full_name" TEXT NOT NULL,
    "full_picture" BYTEA,
    "social_media" TEXT,
    "complete_address" TEXT,
    "contact_number" TEXT,

    CONSTRAINT "bph_users_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "bph_barbers" (
    "barber_id" TEXT NOT NULL,
    "branch_id" TEXT,
    "position" TEXT,
    "full_name" TEXT NOT NULL,
    "address" TEXT,
    "commission" DECIMAL(65,30),
    "picture" BYTEA,
    "social_media" TEXT,
    "email_address" TEXT,

    CONSTRAINT "bph_barbers_pkey" PRIMARY KEY ("barber_id")
);

-- CreateTable
CREATE TABLE "bph_inventory" (
    "product_id" TEXT NOT NULL,
    "category" TEXT,
    "product_name" TEXT NOT NULL,
    "product_image" TEXT,
    "stock_price" DECIMAL(65,30),
    "miniumum_stock" DECIMAL(65,30),
    "initial_stock" DECIMAL(65,30),
    "unit_cost" DECIMAL(65,30),
    "stock_size" DECIMAL(65,30),
    "stock_size_uom" TEXT,
    "stock_usage" DECIMAL(65,30),
    "stock_usage_uom" TEXT,
    "stock_yields" DECIMAL(65,30),
    "stock_cost" DECIMAL(65,30),
    "other_cost" DECIMAL(65,30),
    "other_discounts" DECIMAL(65,30),

    CONSTRAINT "bph_inventory_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "bph_inventory_category" (
    "category_id" TEXT NOT NULL,
    "category_description" TEXT NOT NULL,

    CONSTRAINT "bph_inventory_category_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "bph_paymentmethods" (
    "payment_method_id" TEXT NOT NULL,
    "payment_method_name" TEXT NOT NULL,
    "bank_number" TEXT,

    CONSTRAINT "bph_paymentmethods_pkey" PRIMARY KEY ("payment_method_id")
);

-- CreateTable
CREATE TABLE "bph_inventory_trail" (
    "id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "category" TEXT,
    "product_name" TEXT NOT NULL,
    "movement_type" TEXT NOT NULL,
    "created_date" DATE NOT NULL,
    "quantity" DECIMAL(65,30),
    "quantity_price" DECIMAL(65,30),
    "stock_size" DECIMAL(65,30),
    "stock_size_uom" TEXT,
    "unit_price" DECIMAL(65,30),
    "unit_cost" DECIMAL(65,30),
    "additional_notes" TEXT,

    CONSTRAINT "bph_inventory_trail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bph_customers" (
    "customer_id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_address" TEXT,
    "social_media" TEXT,
    "contact_number" TEXT,
    "email_address" TEXT,
    "visit_count" INTEGER DEFAULT 0,

    CONSTRAINT "bph_customers_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "pos_checkout" (
    "id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_social_media" TEXT,
    "customer_address" TEXT,
    "customer_email" TEXT,
    "assigned_branch" TEXT NOT NULL,
    "assigned_barber" TEXT NOT NULL,
    "service_code" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "payment_method" TEXT NOT NULL,
    "reference_number" TEXT,
    "purchased_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pos_checkout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pos_queue" (
    "id" TEXT NOT NULL,
    "customer_name" TEXT NOT NULL,
    "customer_social_media" TEXT,
    "customer_address" TEXT,
    "customer_email" TEXT,
    "appointment_id" TEXT,
    "appointment_date" TEXT,
    "service_code" TEXT NOT NULL,
    "assigned_barber" TEXT NOT NULL,
    "assigned_branch" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "pos_queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pos_slots" (
    "id" TEXT NOT NULL,
    "branch_id" TEXT NOT NULL,
    "slot_id" TEXT NOT NULL,
    "assigned_barber" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "pos_slots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bph_users_user_id_key" ON "bph_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "bph_users_email_address_key" ON "bph_users"("email_address");

-- CreateIndex
CREATE UNIQUE INDEX "bph_paymentmethods_payment_method_name_key" ON "bph_paymentmethods"("payment_method_name");

-- AddForeignKey
ALTER TABLE "bph_sales" ADD CONSTRAINT "bph_sales_barber_id_fkey" FOREIGN KEY ("barber_id") REFERENCES "bph_barbers"("barber_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bph_sales" ADD CONSTRAINT "bph_sales_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "bph_branches"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bph_sales" ADD CONSTRAINT "bph_sales_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "bph_customers"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bph_sales" ADD CONSTRAINT "bph_sales_payment_method_fkey" FOREIGN KEY ("payment_method") REFERENCES "bph_paymentmethods"("payment_method_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bph_sales" ADD CONSTRAINT "bph_sales_service_code_fkey" FOREIGN KEY ("service_code") REFERENCES "bph_services"("service_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bph_services_cost" ADD CONSTRAINT "bph_services_cost_cost_id_fkey" FOREIGN KEY ("cost_id") REFERENCES "bph_inventory"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bph_services_cost" ADD CONSTRAINT "bph_services_cost_service_code_fkey" FOREIGN KEY ("service_code") REFERENCES "bph_services"("service_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bph_branches" ADD CONSTRAINT "bph_branches_branch_owner_fkey" FOREIGN KEY ("branch_owner") REFERENCES "bph_users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bph_barbers" ADD CONSTRAINT "bph_barbers_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "bph_branches"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bph_inventory" ADD CONSTRAINT "bph_inventory_category_fkey" FOREIGN KEY ("category") REFERENCES "bph_inventory_category"("category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bph_inventory_trail" ADD CONSTRAINT "bph_inventory_trail_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "bph_inventory"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_checkout" ADD CONSTRAINT "pos_checkout_assigned_barber_fkey" FOREIGN KEY ("assigned_barber") REFERENCES "bph_barbers"("barber_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_checkout" ADD CONSTRAINT "pos_checkout_payment_method_fkey" FOREIGN KEY ("payment_method") REFERENCES "bph_paymentmethods"("payment_method_name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_checkout" ADD CONSTRAINT "pos_checkout_service_code_fkey" FOREIGN KEY ("service_code") REFERENCES "bph_services"("service_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_queue" ADD CONSTRAINT "pos_queue_service_code_fkey" FOREIGN KEY ("service_code") REFERENCES "bph_services"("service_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_slots" ADD CONSTRAINT "pos_slots_assigned_barber_fkey" FOREIGN KEY ("assigned_barber") REFERENCES "bph_barbers"("barber_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pos_slots" ADD CONSTRAINT "pos_slots_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "bph_branches"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ADD VIEWS

CREATE VIEW "v_barbers_performance" AS
SELECT