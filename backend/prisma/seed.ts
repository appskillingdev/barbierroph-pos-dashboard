import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import pg from "pg";
import bcrypt from "bcrypt";

// Create a connection pool for Prisma adapter
const pool = new pg.Pool({
  connectionString:
    process.env.DATABASE_URL || "postgresql://admin:admin@localhost:5432/mydb",
});

// Create Prisma adapter with the pool
const adapter = new PrismaPg(pool);

// Instantiate Prisma Client with the adapter
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...");

  // Clean existing data
  console.log("🗑️  Cleaning existing data...");
  await prisma.$executeRaw`TRUNCATE TABLE bph_sales CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE bph_services_cost CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE bph_services CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE bph_barbers CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE bph_branches CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE bph_users CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE bph_customers CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE bph_inventory_trail CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE bph_inventory CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE bph_inventory_category CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE bph_paymentmethods CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE pos_checkout CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE pos_queue CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE pos_slots CASCADE`;

  // 1. Create Users (must be first - referenced by branches)
  console.log("👥 Creating users...");

  // Hash passwords for all test users
  // Default password for all users: "Password123!"
  const defaultPassword = await bcrypt.hash("Password123!", 10);

  const users = await Promise.all([
    prisma.$executeRaw`
      INSERT INTO bph_users ("ID", user_id, email_address, password, full_name, contact_number, user_type)
      VALUES ('user001', 'owner001', 'owner1@barbierro.com', ${defaultPassword}, 'Juan Dela Cruz', '09171234567', 'P01')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_users ("ID", user_id, email_address, password, full_name, contact_number, user_type)
      VALUES ('user002', 'owner002', 'owner2@barbierro.com', ${defaultPassword}, 'Maria Santos', '09187654321', 'P02')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_users ("ID", user_id, email_address, password, full_name, contact_number, user_type)
      VALUES ('user003', 'owner003', 'owner3@barbierro.com', ${defaultPassword}, 'Pedro Reyes', '09199876543', 'P02')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_users ("ID", user_id, email_address, password, full_name, contact_number, user_type)
      VALUES ('user004', 'cashier004', 'cashier4@barbierro.com', ${defaultPassword}, 'Ana Cruz', '09191234567', 'P03')
    `,
  ]);
  console.log("✅ Created 4 users (default password: Password123!)");

  // 2. Create Branches (references users)
  console.log("🏢 Creating branches...");
  await Promise.all([
    prisma.$executeRaw`
      INSERT INTO bph_branches (branch_id, branch_owner, established_at, branch_location, branch_address)
      VALUES ('branch001', 'owner001', '2020-01-15', 'Manila', '123 Rizal Ave, Manila')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_branches (branch_id, branch_owner, established_at, branch_location, branch_address)
      VALUES ('branch002', 'owner002', '2021-06-20', 'Quezon City', '456 Commonwealth Ave, QC')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_branches (branch_id, branch_owner, established_at, branch_location, branch_address)
      VALUES ('branch003', 'owner001', '2022-03-10', 'Makati', '789 Ayala Ave, Makati')
    `,
  ]);
  console.log("✅ Created 3 branches");

  // 3. Create Barbers (references branches)
  console.log("✂️  Creating barbers...");
  await Promise.all([
    prisma.$executeRaw`
      INSERT INTO bph_barbers (barber_id, branch_id, position, full_name, address, commission, email_address)
      VALUES ('barber001', 'branch001', 'Senior Barber', 'Jose Garcia', 'Manila', 0.40, 'jose@barbierro.com')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_barbers (barber_id, branch_id, position, full_name, address, commission, email_address)
      VALUES ('barber002', 'branch001', 'Junior Barber', 'Rico Lopez', 'Manila', 0.30, 'rico@barbierro.com')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_barbers (barber_id, branch_id, position, full_name, address, commission, email_address)
      VALUES ('barber003', 'branch002', 'Senior Barber', 'Ramon Cruz', 'Quezon City', 0.40, 'ramon@barbierro.com')
    `,
  ]);
  console.log("✅ Created 3 barbers");

  // 4. Create Customers
  console.log("👤 Creating customers...");
  await Promise.all([
    prisma.$executeRaw`
      INSERT INTO bph_customers (customer_id, customer_name, customer_address, contact_number, email_address, visit_count)
      VALUES ('cust001', 'John Smith', 'Manila', '09171111111', 'john@email.com', 5)
    `,
    prisma.$executeRaw`
      INSERT INTO bph_customers (customer_id, customer_name, customer_address, contact_number, email_address, visit_count)
      VALUES ('cust002', 'Robert Johnson', 'Quezon City', '09172222222', 'robert@email.com', 3)
    `,
    prisma.$executeRaw`
      INSERT INTO bph_customers (customer_id, customer_name, customer_address, contact_number, email_address, visit_count)
      VALUES ('cust003', 'Michael Brown', 'Makati', '09173333333', 'michael@email.com', 8)
    `,
  ]);
  console.log("✅ Created 3 customers");

  // 5. Create Services
  console.log("🛠️  Creating services...");
  await Promise.all([
    prisma.$executeRaw`
      INSERT INTO bph_services (service_code, category, cluster, service_name, service_description, service_amount, is_promo)
      VALUES ('svc001', 'Haircut', 'Standard', 'Regular Haircut', 'Basic haircut service', 150.00, false)
    `,
    prisma.$executeRaw`
      INSERT INTO bph_services (service_code, category, cluster, service_name, service_description, service_amount, is_promo)
      VALUES ('svc002', 'Haircut', 'Premium', 'Premium Haircut', 'Premium haircut with styling', 250.00, false)
    `,
    prisma.$executeRaw`
      INSERT INTO bph_services (service_code, category, cluster, service_name, service_description, service_amount, is_promo)
      VALUES ('svc003', 'Grooming', 'Standard', 'Beard Trim', 'Professional beard trimming', 100.00, true)
    `,
  ]);
  console.log("✅ Created 3 services");

  // 6. Create Inventory Categories
  console.log("📦 Creating inventory categories...");
  await Promise.all([
    prisma.$executeRaw`
      INSERT INTO bph_inventory_category (category_id, category_description)
      VALUES ('cat001', 'Hair Products')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_inventory_category (category_id, category_description)
      VALUES ('cat002', 'Grooming Tools')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_inventory_category (category_id, category_description)
      VALUES ('cat003', 'Cleaning Supplies')
    `,
  ]);
  console.log("✅ Created 3 inventory categories");

  // 7. Create Inventory
  console.log("📦 Creating inventory items...");
  await Promise.all([
    prisma.$executeRaw`
      INSERT INTO bph_inventory (product_id, category, product_name, stock_price, miniumum_stock, initial_stock, unit_cost, stock_size, stock_size_uom)
      VALUES ('prod001', 'cat001', 'Hair Gel 500ml', 250.00, 5, 20, 200.00, 500, 'ml')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_inventory (product_id, category, product_name, stock_price, miniumum_stock, initial_stock, unit_cost, stock_size, stock_size_uom)
      VALUES ('prod002', 'cat002', 'Professional Scissors', 1500.00, 2, 10, 1200.00, 1, 'piece')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_inventory (product_id, category, product_name, stock_price, miniumum_stock, initial_stock, unit_cost, stock_size, stock_size_uom)
      VALUES ('prod003', 'cat001', 'Shampoo 1L', 350.00, 10, 15, 280.00, 1000, 'ml')
    `,
  ]);
  console.log("✅ Created 3 inventory items");

  // 8. Create Services Cost (references services and inventory)
  console.log("💰 Creating services cost...");
  await Promise.all([
    prisma.$executeRaw`
      INSERT INTO bph_services_cost (service_code, item_number, cost_category, cost_id)
      VALUES ('svc001', '001', 'Product', 'prod001')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_services_cost (service_code, item_number, cost_category, cost_id)
      VALUES ('svc002', '001', 'Product', 'prod001')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_services_cost (service_code, item_number, cost_category, cost_id)
      VALUES ('svc002', '002', 'Product', 'prod003')
    `,
  ]);
  console.log("✅ Created 3 services cost records");

  // 9. Create Payment Methods
  console.log("💳 Creating payment methods...");
  await Promise.all([
    prisma.$executeRaw`
      INSERT INTO bph_paymentmethods (payment_method_id, payment_method_name, bank_number)
      VALUES ('pm001', 'Cash', NULL)
    `,
    prisma.$executeRaw`
      INSERT INTO bph_paymentmethods (payment_method_id, payment_method_name, bank_number)
      VALUES ('pm002', 'GCash', '09171234567')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_paymentmethods (payment_method_id, payment_method_name, bank_number)
      VALUES ('pm003', 'Credit Card', '1234567890123456')
    `,
  ]);
  console.log("✅ Created 3 payment methods");

  // 10. Create Sales (references multiple tables)
  console.log("💵 Creating sales...");
  await Promise.all([
    prisma.$executeRaw`
      INSERT INTO bph_sales (transaction_id, transaction_date, customer_id, branch_id, barber_id, service_code, total_amount, payment_method)
      VALUES ('txn001', '2026-08-10', 'cust001', 'branch001', 'barber001', 'svc001', 150.00, 'pm001')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_sales (transaction_id, transaction_date, customer_id, branch_id, barber_id, service_code, total_amount, payment_method)
      VALUES ('txn002', '2026-08-12', 'cust002', 'branch002', 'barber003', 'svc002', 250.00, 'pm002')
    `,
    prisma.$executeRaw`
      INSERT INTO bph_sales (transaction_id, transaction_date, customer_id, branch_id, barber_id, service_code, total_amount, payment_method, reference_no)
      VALUES ('txn003', '2026-08-14', 'cust003', 'branch001', 'barber002', 'svc003', 100.00, 'pm002', 'GCASH123456')
    `,
  ]);
  console.log("✅ Created 3 sales records");

  // 11. Create Inventory Trail
  console.log("📊 Creating inventory trail...");
  await Promise.all([
    prisma.$executeRaw`
      INSERT INTO bph_inventory_trail (id, product_id, category, product_name, movement_type, created_date, quantity, unit_price)
      VALUES ('trail001', 'prod001', 'cat001', 'Hair Gel 500ml', 'IN', '2026-08-01', 20, 200.00)
    `,
    prisma.$executeRaw`
      INSERT INTO bph_inventory_trail (id, product_id, category, product_name, movement_type, created_date, quantity, unit_price)
      VALUES ('trail002', 'prod001', 'cat001', 'Hair Gel 500ml', 'OUT', '2026-08-10', 2, 200.00)
    `,
    prisma.$executeRaw`
      INSERT INTO bph_inventory_trail (id, product_id, category, product_name, movement_type, created_date, quantity, unit_price)
      VALUES ('trail003', 'prod002', 'cat002', 'Professional Scissors', 'IN', '2026-08-05', 10, 1200.00)
    `,
  ]);
  console.log("✅ Created 3 inventory trail records");

  // 12. Create POS Queue
  console.log("📋 Creating POS queue...");
  await Promise.all([
    prisma.$executeRaw`
      INSERT INTO pos_queue (id, customer_name, service_code, assigned_barber, assigned_branch, status)
      VALUES ('queue001', 'John Smith', 'svc001', 'barber001', 'branch001', 'waiting')
    `,
    prisma.$executeRaw`
      INSERT INTO pos_queue (id, customer_name, customer_email, service_code, assigned_barber, assigned_branch, status)
      VALUES ('queue002', 'Robert Johnson', 'robert@email.com', 'svc002', 'barber003', 'branch002', 'in-progress')
    `,
    prisma.$executeRaw`
      INSERT INTO pos_queue (id, customer_name, service_code, assigned_barber, assigned_branch, status)
      VALUES ('queue003', 'Michael Brown', 'svc003', 'barber002', 'branch001', 'completed')
    `,
  ]);
  console.log("✅ Created 3 queue records");

  // 13. Create POS Checkout
  console.log("🛒 Creating POS checkout...");
  await Promise.all([
    prisma.$executeRaw`
      INSERT INTO pos_checkout (id, customer_name, assigned_branch, assigned_barber, service_code, amount, payment_method, purchased_at)
      VALUES ('checkout001', 'John Smith', 'branch001', 'barber001', 'svc001', 150.00, 'Cash', '2026-08-10 10:30:00')
    `,
    prisma.$executeRaw`
      INSERT INTO pos_checkout (id, customer_name, customer_email, assigned_branch, assigned_barber, service_code, amount, payment_method, purchased_at)
      VALUES ('checkout002', 'Robert Johnson', 'robert@email.com', 'branch002', 'barber003', 'svc002', 250.00, 'GCash', '2026-08-12 14:45:00')
    `,
    prisma.$executeRaw`
      INSERT INTO pos_checkout (id, customer_name, assigned_branch, assigned_barber, service_code, amount, payment_method, reference_number, purchased_at)
      VALUES ('checkout003', 'Michael Brown', 'branch001', 'barber002', 'svc003', 100.00, 'GCash', 'GCASH789', '2026-08-14 16:20:00')
    `,
  ]);
  console.log("✅ Created 3 checkout records");

  // 14. Create POS Slots
  console.log("🎫 Creating POS slots...");
  await Promise.all([
    prisma.$executeRaw`
      INSERT INTO pos_slots (id, branch_id, slot_id, assigned_barber, status)
      VALUES ('slot001', 'branch001', 'SLOT-A1', 'barber001', 'occupied')
    `,
    prisma.$executeRaw`
      INSERT INTO pos_slots (id, branch_id, slot_id, assigned_barber, status)
      VALUES ('slot002', 'branch001', 'SLOT-A2', 'barber002', 'available')
    `,
    prisma.$executeRaw`
      INSERT INTO pos_slots (id, branch_id, slot_id, assigned_barber, status)
      VALUES ('slot003', 'branch002', 'SLOT-B1', 'barber003', 'occupied')
    `,
  ]);
  console.log("✅ Created 3 slot records");

  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
