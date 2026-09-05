/* @name CreateServiceCost */
INSERT INTO bph_services_cost (service_code, item_number, cost_category, cost_id)
VALUES (:service_code, :item_number, :cost_category, :cost_id);

/* @name GetAllServicesCost */
SELECT * FROM bph_services_cost ORDER BY service_code;

/* @name GetServiceCostByServiceCode */
SELECT * FROM bph_services_cost WHERE service_code = :service_code;

/* @name GetServiceCostByCostId */
SELECT * FROM bph_services_cost WHERE cost_id = :cost_id;

/* @name UpdateServiceCost */
UPDATE bph_services_cost 
SET cost_category = :cost_category,
    cost_id = :cost_id
WHERE service_code = :service_code AND item_number = :item_number;

/* @name DeleteServiceCost */
DELETE FROM bph_services_cost WHERE service_code = :service_code AND item_number = :item_number;

/* @name DeleteServiceCostByServiceCode */
DELETE FROM bph_services_cost WHERE service_code = :service_code;
