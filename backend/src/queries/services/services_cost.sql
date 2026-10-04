/* @name CreateServiceCost */
INSERT INTO bph_services_cost (service_code, item_number, cost_category, cost_id, multiplier)
VALUES (:service_code, :item_number, COALESCE(:cost_category, 'Product'), :cost_id, :multiplier)
RETURNING *;

/* @name GetAllServicesCost */
SELECT sc.*,
    i.product_name AS description,
    i.unit_cost,
    i.unit_cost * COALESCE(sc.multiplier, 1) AS cost_amount,
    i.miniumum_stock AS minimum_qty
FROM bph_services_cost sc
JOIN bph_inventory i ON i.product_id = sc.cost_id
ORDER BY sc.service_code, sc.item_number;

/* @name GetServiceCostByServiceCode */
SELECT sc.*,
    i.product_name AS description,
    i.unit_cost,
    i.unit_cost * COALESCE(sc.multiplier, 1) AS cost_amount,
    i.miniumum_stock AS minimum_qty
FROM bph_services_cost sc
JOIN bph_inventory i ON i.product_id = sc.cost_id
WHERE sc.service_code = :service_code
ORDER BY sc.item_number;

/* @name GetServiceCostByCostId */
SELECT sc.*,
    i.product_name AS description,
    i.unit_cost,
    i.unit_cost * COALESCE(sc.multiplier, 1) AS cost_amount,
    i.miniumum_stock AS minimum_qty
FROM bph_services_cost sc
JOIN bph_inventory i ON i.product_id = sc.cost_id
WHERE sc.cost_id = :cost_id
ORDER BY sc.service_code, sc.item_number;

/* @name UpdateServiceCost */
UPDATE bph_services_cost 
SET cost_category = COALESCE(:cost_category, 'Product'),
    multiplier = :multiplier
WHERE service_code = :service_code AND item_number = :item_number AND cost_id = :cost_id
RETURNING *;

/* @name DeleteServiceCost */
DELETE FROM bph_services_cost 
WHERE service_code = :service_code AND item_number = :item_number AND cost_id = :cost_id
RETURNING *;

/* @name DeleteServiceCostByServiceCode */
DELETE FROM bph_services_cost WHERE service_code = :service_code;
