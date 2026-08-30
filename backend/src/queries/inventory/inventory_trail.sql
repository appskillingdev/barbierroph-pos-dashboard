/* @name CreateInventoryTrail */
INSERT INTO bph_inventory_trail (id, product_id, category, product_name, movement_type, created_date, quantity, quantity_price, stock_size, stock_size_uom, unit_price, unit_cost, additional_notes)
VALUES (:id, :product_id, :category, :product_name, :movement_type, :created_date, :quantity, :quantity_price, :stock_size, :stock_size_uom, :unit_price, :unit_cost, :additional_notes);

/* @name GetAllInventoryTrail */
SELECT * FROM bph_inventory_trail ORDER BY created_date DESC;

/* @name GetInventoryTrailById */
SELECT * FROM bph_inventory_trail WHERE id = :id;

/* @name GetInventoryTrailByProductId */
SELECT * FROM bph_inventory_trail WHERE product_id = :product_id ORDER BY created_date DESC;

/* @name GetInventoryTrailByMovementType */
SELECT * FROM bph_inventory_trail WHERE movement_type = :movement_type ORDER BY created_date DESC;

/* @name GetInventoryTrailByDateRange */
SELECT * FROM bph_inventory_trail WHERE created_date BETWEEN :start_date AND :end_date ORDER BY created_date DESC;

/* @name UpdateInventoryTrail */
UPDATE bph_inventory_trail 
SET product_id = :product_id,
    category = :category,
    product_name = :product_name,
    movement_type = :movement_type,
    created_date = :created_date,
    quantity = :quantity,
    quantity_price = :quantity_price,
    stock_size = :stock_size,
    stock_size_uom = :stock_size_uom,
    unit_price = :unit_price,
    unit_cost = :unit_cost,
    additional_notes = :additional_notes
WHERE id = :id;

/* @name DeleteInventoryTrail */
DELETE FROM bph_inventory_trail WHERE id = :id;
