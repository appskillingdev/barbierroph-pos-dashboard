/* @name CreateSaleItem */
INSERT INTO bph_sales_item (transaction_id, item_number, service_code, barber_id, amount)
VALUES (
    :transaction_id, 
    :item_number, 
    :service_code, 
    :barber_id, 
    COALESCE(:amount, (SELECT service_amount FROM bph_services WHERE service_code = :service_code))
)
RETURNING *;

/* @name GetSaleItemsByTransactionId */
SELECT * FROM bph_sales_item WHERE transaction_id = :transaction_id ORDER BY item_number;

/* @name GetSaleItemsByBarber */
SELECT * FROM bph_sales_item WHERE barber_id = :barber_id ORDER BY transaction_id, item_number;

/* @name UpdateSaleItem */
UPDATE bph_sales_item 
SET service_code = :service_code,
    barber_id = :barber_id,
    amount = COALESCE(:amount, (SELECT service_amount FROM bph_services WHERE service_code = :service_code))
WHERE transaction_id = :transaction_id AND item_number = :item_number
RETURNING *;

/* @name DeleteSaleItem */
DELETE FROM bph_sales_item WHERE transaction_id = :transaction_id AND item_number = :item_number
RETURNING *;
