/* @name CreateService */
INSERT INTO bph_services (service_code, category, cluster, service_name, service_description, service_amount, icon, is_promo)
VALUES (:service_code, :category, :cluster, :service_name, :service_description, :service_amount, :icon, :is_promo);

/* @name GetAllServices */
SELECT * FROM bph_services ORDER BY service_name;

/* @name GetServiceByCode */
SELECT * FROM bph_services WHERE service_code = :service_code;

/* @name GetServicesByCategory */
SELECT * FROM bph_services WHERE category = :category ORDER BY service_name;

/* @name GetPromoServices */
SELECT * FROM bph_services WHERE is_promo = true ORDER BY service_name;

/* @name UpdateService */
UPDATE bph_services 
SET category = :category,
    cluster = :cluster,
    service_name = :service_name,
    service_description = :service_description,
    service_amount = :service_amount,
    icon = :icon,
    is_promo = :is_promo
WHERE service_code = :service_code;

/* @name DeleteService */
DELETE FROM bph_services WHERE service_code = :service_code;
