/* @name CreateCustomer */
INSERT INTO bph_customers (customer_id, customer_name, customer_address, social_media, contact_number, email_address, visit_count)
VALUES (:customer_id, :customer_name, :customer_address, :social_media, :contact_number, :email_address, :visit_count);

/* @name GetAllCustomers */
SELECT * FROM bph_customers ORDER BY customer_name;

/* @name GetCustomerById */
SELECT * FROM bph_customers WHERE customer_id = :customer_id;

/* @name GetCustomersByName */
SELECT * FROM bph_customers WHERE customer_name ILIKE :customer_name ORDER BY customer_name;

/* @name GetTopCustomers */
SELECT * FROM bph_customers ORDER BY visit_count DESC LIMIT :limit;

/* @name UpdateCustomer */
UPDATE bph_customers 
SET customer_name = :customer_name,
    customer_address = :customer_address,
    social_media = :social_media,
    contact_number = :contact_number,
    email_address = :email_address,
    visit_count = :visit_count
WHERE customer_id = :customer_id;

/* @name IncrementCustomerVisitCount */
UPDATE bph_customers 
SET visit_count = COALESCE(visit_count, 0) + 1
WHERE customer_id = :customer_id;

/* @name DeleteCustomer */
DELETE FROM bph_customers WHERE customer_id = :customer_id;
