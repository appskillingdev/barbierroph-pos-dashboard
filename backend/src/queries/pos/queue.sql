/* @name CreateQueue */
INSERT INTO pos_queue (id, customer_name, customer_social_media, customer_address, customer_email, appointment_id, appointment_date, service_code, assigned_barber, assigned_branch, status)
VALUES (:id, :customer_name, :customer_social_media, :customer_address, :customer_email, :appointment_id, :appointment_date, :service_code, :assigned_barber, :assigned_branch, :status);

/* @name GetAllQueues */
SELECT * FROM pos_queue ORDER BY appointment_date;

/* @name GetQueueById */
SELECT * FROM pos_queue WHERE id = :id;

/* @name GetQueuesByBranch */
SELECT * FROM pos_queue WHERE assigned_branch = :assigned_branch ORDER BY appointment_date;

/* @name GetQueuesByBarber */
SELECT * FROM pos_queue WHERE assigned_barber = :assigned_barber ORDER BY appointment_date;

/* @name GetQueuesByStatus */
SELECT * FROM pos_queue WHERE status = :status ORDER BY appointment_date;

/* @name GetQueuesByCustomerName */
SELECT * FROM pos_queue WHERE customer_name ILIKE :customer_name ORDER BY appointment_date;

/* @name UpdateQueue */
UPDATE pos_queue 
SET customer_name = :customer_name,
    customer_social_media = :customer_social_media,
    customer_address = :customer_address,
    customer_email = :customer_email,
    appointment_id = :appointment_id,
    appointment_date = :appointment_date,
    service_code = :service_code,
    assigned_barber = :assigned_barber,
    assigned_branch = :assigned_branch,
    status = :status
WHERE id = :id;

/* @name UpdateQueueStatus */
UPDATE pos_queue 
SET status = :status
WHERE id = :id;

/* @name DeleteQueue */
DELETE FROM pos_queue WHERE id = :id;
