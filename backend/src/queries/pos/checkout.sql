/* @name CreateCheckout */
INSERT INTO pos_checkout (id, customer_name, customer_social_media, customer_address, customer_email, assigned_branch, assigned_barber, service_code, amount, payment_method, reference_number, purchased_at)
VALUES (:id, :customer_name, :customer_social_media, :customer_address, :customer_email, :assigned_branch, :assigned_barber, :service_code, :amount, :payment_method, :reference_number, :purchased_at);

/* @name GetAllCheckouts */
SELECT * FROM pos_checkout ORDER BY purchased_at DESC;

/* @name GetCheckoutById */
SELECT * FROM pos_checkout WHERE id = :id;

/* @name GetCheckoutsByBranch */
SELECT * FROM pos_checkout WHERE assigned_branch = :assigned_branch ORDER BY purchased_at DESC;

/* @name GetCheckoutsByBarber */
SELECT * FROM pos_checkout WHERE assigned_barber = :assigned_barber ORDER BY purchased_at DESC;

/* @name GetCheckoutsByDateRange */
SELECT * FROM pos_checkout WHERE purchased_at BETWEEN :start_date AND :end_date ORDER BY purchased_at DESC;

/* @name GetCheckoutsByCustomerName */
SELECT * FROM pos_checkout WHERE customer_name ILIKE :customer_name ORDER BY purchased_at DESC;

/* @name UpdateCheckout */
UPDATE pos_checkout 
SET customer_name = :customer_name,
    customer_social_media = :customer_social_media,
    customer_address = :customer_address,
    customer_email = :customer_email,
    assigned_branch = :assigned_branch,
    assigned_barber = :assigned_barber,
    service_code = :service_code,
    amount = :amount,
    payment_method = :payment_method,
    reference_number = :reference_number,
    purchased_at = :purchased_at
WHERE id = :id;

/* @name DeleteCheckout */
DELETE FROM pos_checkout WHERE id = :id;
