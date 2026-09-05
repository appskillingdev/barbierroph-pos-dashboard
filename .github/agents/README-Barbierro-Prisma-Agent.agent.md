---
name: README-Barbierro-Prisma-Agent
description: Writes a Prisma schema based on the Barbierro database architecture context.
tools: ["read", "agent", "edit"] # specify the tools this agent can use. If not set, all enabled tools are allowed.
---

<!-- Tip: Use /create-agent in chat to generate content with agent assistance -->

# Barbierro Architecture Context for GitHub Copilot Agent

## Purpose

This file is the COMPLETE source of truth for GitHub Copilot Agent.
Assume the agent CANNOT access the original Excel file.
Use this document to review, validate, improve, or generate `schema.prisma`.

## Naming Legend

- bph\_\* = persisted tables
- pos\_\* = POS operational tables
- api\_\* = external integrations
- v\_\* = analytics/reporting views

---

# TABLE: pos_checkout

Fields:

- customer_name:String
- customer_social_media:String
- customer_address:String
- customer_email:String
- assigned_branch:String
- assigned_barber:String
- service_code:String
- amount:Decimal
- payment_method:String
- reference_number:String
- purchased_at:Datetime

Relations:

- assigned_barber -> bph_barbers.barber_id
- service_code -> bph_services.service_code
- payment_method -> bph_paymentmethods.payment_method_name

---

# TABLE: pos_queue

Fields:

- customer_name:String
- customer_social_media:String
- customer_address:String
- customer_email:String
- appointment_id:String
- appointment_date:String
- service_code:String
- assigned_barber:String
- assigned_branch:String
- status:String

Relations:

- appointment_id -> api_appointments
- service_code -> bph_services.service_code

---

# TABLE: pos_slots

Fields:

- branch_id:String
- slot_id:String
- assigned_barber:String
- status:String

Relations:

- branch_id -> bph_branches.branch_id
- assigned_barber -> bph_barbers.barber_id

---

# TABLE: bph_sales

Composite Primary Key:

- transaction_id
- transaction_date
- customer_id
- branch_id
- barber_id
- service_code

Fields:

- transaction_id:String
- transaction_date:Date
- customer_id:String
- branch_id:String
- barber_id:String
- service_code:String
- total_amount:Decimal
- payment_method:String
- reference_no:String
- count_1:Int
- count_5:Int
- count_10:Int
- count_20:Int
- count_50:Int
- count_100:Int
- count_200:Int
- count_500:Int
- count_1000:Int
- created_by:String

Ignore Virtual Fields:

- date_quarter
- date_period
- date_month
- date_day
- \_bph_services.category
- \_bph_services.cluster
- \_bph_customer.contact_number
- \_bph_customer.social_media
- \_bph_customer.visit_count
- is_returning

Relations:

- customer_id -> bph_customers.customer_id
- branch_id -> bph_branches.branch_id
- barber_id -> bph_barbers.barber_id
- service_code -> bph_services.service_code
- payment_method -> bph_paymentmethods.payment_method_id

---

# TABLE: bph_services

Primary Key:

- service_code

Fields:

- service_code:String
- category:String
- cluster:String
- service_name:String
- service_description:String
- service_amount:Decimal
- icon:Bytes
- is_promo:Boolean

Ignore Virtual Fields:

- net_amount

Relations:

- bph_services 1:N bph_services_cost

---

# TABLE: bph_services_cost

Composite Primary Key:

- service_code
- item_number
- cost_category
- cost_id

Fields:

- service_code:String
- item_number:String
- cost_category:String
- cost_id:String

Ignore Virtual Fields:

- description
- cost_amount

Relations:

- service_code -> bph_services.service_code
- cost_id -> bph_inventory.product_id

---

# TABLE: bph_branches

Primary Key:

- branch_id

Fields:

- branch_id:String
- branch_owner:String
- established_at:Date
- branch_location:String
- branch_address:String
- branch_image:Bytes
- social_media:String

Relations:

- branch_owner -> bph_users.user_id
- bph_branches 1:N bph_barbers
- bph_branches 1:N bph_sales

---

# TABLE: bph_users

Composite Key Candidates:

- ID
- user_id
- email_address

Fields:

- ID:Guid
- user_id:String
- email_address:String
- password:String
- created_at:Datetime
- full_name:String
- full_picture:Bytes
- social_media:String
- complete_address:String
- contact_number:String

Relations:

- bph_users 1:N bph_branches

---

# TABLE: bph_barbers

Primary Key:

- barber_id

Fields:

- barber_id:Guid
- position:String
- full_name:String
- address:String
- commission:Decimal
- picture:Bytes
- social_media:String
- email_address:String

Relations:

- bph_barbers 1:N bph_sales

---

# TABLE: bph_inventory

Primary Key:

- product_id

Fields:

- product_id:String
- category:String
- product_name:String
- product_image:String
- stock_price:Decimal
- miniumum_stock:Decimal
- initial_stock:Decimal
- unit_cost:Decimal
- stock_size:Decimal
- stock_size_uom:String
- stock_usage:Decimal
- stock_usage_uom:Decimal
- stock_yields:Decimal
- stock_cost:Decimal
- other_cost:Decimal
- other_discounts:Decimal

Relations:

- category -> bph_inventory_category.category_id

---

# TABLE: bph_inventory_category

Primary Key:

- category_id

Fields:

- category_id:String
- category_description:String

---

# TABLE: bph_paymentmethods

Primary Key:

- payment_method_id

Fields:

- payment_method_id:String
- payment_method_name:String
- bank_number:String

---

# TABLE: bph_inventory_trail

Fields:

- product_id:String
- category:String
- product_name:String
- movement_type:String
- created_date:Date
- quantity:Decimal
- quantity_price:Decimal
- stock_size:Decimal
- stock_size_uom:String
- unit_price:Decimal
- unit_cost:Decimal
- additional_notes:String

Relations:

- product_id -> bph_inventory.product_id

---

# TABLE: bph_customers

Primary Key:

- customer_id

Fields:

- customer_id:Guid
- customer_name:String
- customer_address:String
- social_media:String
- contact_number:String
- email_address:String
- visit_count:Int

Relations:

- bph_customers 1:N bph_sales

---

# VIEW: v_mtd_report

Read-only model.
Fields:

- period
- actual_sales
- headcount
- headcount_prev_month_perctg
- headcount_gained_lost
- growth_vs_ly
- average_cost
- average_heads_per_barber
- average_barbers_on_duty
- average_daily_sales
- average_daily_headcount
- operational_days_count
- total_barber_payouts
- total_staff_payouts
- grant_total_payouts
- monthly_gross_profit
- monthly_share
- average_monthly_payout
- average_daily_payout

---

# VIEW: v_barbers_performance

Read-only analytics view.
Tracks barber performance, transactions, commissions, period revenue and daily breakdowns.

---

# VIEW: v_customer_lifetime_value

Fields:

- customer_id
- customer_name
- visit_count
- visit_interval
- average_visit
- clv
- visit_date_first
- visit_date_latest
- projected_date_return
- lastest_barber_assigned
- lastest_service

---

# Prisma Agent Rules

1. Preserve DB names with @@map and @map.
2. Convert snake_case columns to camelCase fields.
3. Convert table names to PascalCase models.
4. Create Prisma relations from all relationships above.
5. Ignore all Virtual Fields.
6. Keep reporting views read-only.
7. Validate composite keys.
8. Compare this document against existing schema.prisma and only propose missing changes.
