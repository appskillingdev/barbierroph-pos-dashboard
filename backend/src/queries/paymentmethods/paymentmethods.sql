/* @name CreatePaymentMethod */
INSERT INTO bph_paymentmethods (payment_method_id, payment_method_name, bank_number)
VALUES (:payment_method_id, :payment_method_name, :bank_number);

/* @name GetAllPaymentMethods */
SELECT * FROM bph_paymentmethods ORDER BY payment_method_name;

/* @name GetPaymentMethodById */
SELECT * FROM bph_paymentmethods WHERE payment_method_id = :payment_method_id;

/* @name GetPaymentMethodByName */
SELECT * FROM bph_paymentmethods WHERE payment_method_name = :payment_method_name;

/* @name UpdatePaymentMethod */
UPDATE bph_paymentmethods 
SET payment_method_name = :payment_method_name,
    bank_number = :bank_number
WHERE payment_method_id = :payment_method_id;

/* @name DeletePaymentMethod */
DELETE FROM bph_paymentmethods WHERE payment_method_id = :payment_method_id;
