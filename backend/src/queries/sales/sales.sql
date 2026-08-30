/* @name CreateSale */
INSERT INTO bph_sales (
    transaction_id, 
    transaction_date, 
    customer_id, 
    branch_id, 
    barber_id, 
    service_code, 
    total_amount, 
    payment_method, 
    reference_no, 
    count_1, 
    count_5, 
    count_10, 
    count_20, 
    count_50, 
    count_100, 
    count_200, 
    count_500, 
    count_1000, 
    created_by
)
VALUES (
    :transaction_id, 
    :transaction_date, 
    :customer_id, 
    :branch_id, 
    :barber_id, 
    :service_code, 
    :total_amount, 
    :payment_method, 
    :reference_no, 
    :count_1, 
    :count_5, 
    :count_10, 
    :count_20, 
    :count_50, 
    :count_100, 
    :count_200, 
    :count_500, 
    :count_1000, 
    :created_by
);

/* @name GetLatestSales */
SELECT * FROM bph_sales ORDER BY transaction_date DESC;

/* @name GetSalesByTransactionId */
SELECT * FROM bph_sales WHERE transaction_id = :transaction_id;

/* @name GetSalesByDateRange */
SELECT * FROM bph_sales WHERE transaction_date BETWEEN :start_date AND :end_date ORDER BY transaction_date DESC;

/* @name GetSalesByCustomer */
SELECT * FROM bph_sales WHERE customer_id = :customer_id ORDER BY transaction_date DESC;

/* @name GetSalesByBranch */
SELECT * FROM bph_sales WHERE branch_id = :branch_id ORDER BY transaction_date DESC;

/* @name GetSalesByBarber */
SELECT * FROM bph_sales WHERE barber_id = :barber_id ORDER BY transaction_date DESC;

/* @name GetSalesByPaymentMethod */
SELECT * FROM bph_sales WHERE payment_method = :payment_method ORDER BY transaction_date DESC;

/* @name UpdateSale */
UPDATE bph_sales 
SET total_amount = :total_amount,
    payment_method = :payment_method,
    reference_no = :reference_no,
    count_1 = :count_1,
    count_5 = :count_5,
    count_10 = :count_10,
    count_20 = :count_20,
    count_50 = :count_50,
    count_100 = :count_100,
    count_200 = :count_200,
    count_500 = :count_500,
    count_1000 = :count_1000,
    created_by = :created_by
WHERE transaction_id = :transaction_id 
    AND transaction_date = :transaction_date 
    AND customer_id = :customer_id 
    AND branch_id = :branch_id 
    AND barber_id = :barber_id 
    AND service_code = :service_code;

/* @name DeleteSale */
DELETE FROM bph_sales 
WHERE transaction_id = :transaction_id 
    AND transaction_date = :transaction_date 
    AND customer_id = :customer_id 
    AND branch_id = :branch_id 
    AND barber_id = :barber_id 
    AND service_code = :service_code;