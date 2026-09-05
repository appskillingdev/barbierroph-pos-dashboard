/* @name CreateInventoryItem */
INSERT INTO bph_inventory (product_id, category, product_name, product_image, stock_price, miniumum_stock, initial_stock, unit_cost, stock_size, stock_size_uom, stock_usage, stock_usage_uom, stock_yields, stock_cost, other_cost, other_discounts)
VALUES (:product_id, :category, :product_name, :product_image, :stock_price, :miniumum_stock, :initial_stock, :unit_cost, :stock_size, :stock_size_uom, :stock_usage, :stock_usage_uom, :stock_yields, :stock_cost, :other_cost, :other_discounts);

/* @name GetAllInventoryItems */
SELECT * FROM bph_inventory ORDER BY product_name;

/* @name GetInventoryItemById */
SELECT * FROM bph_inventory WHERE product_id = :product_id;

/* @name GetInventoryItemsByCategory */
SELECT * FROM bph_inventory WHERE category = :category ORDER BY product_name;

/* @name GetLowStockItems */
SELECT * FROM bph_inventory WHERE initial_stock <= miniumum_stock ORDER BY product_name;

/* @name UpdateInventoryItem */
UPDATE bph_inventory 
SET category = :category,
    product_name = :product_name,
    product_image = :product_image,
    stock_price = :stock_price,
    miniumum_stock = :miniumum_stock,
    initial_stock = :initial_stock,
    unit_cost = :unit_cost,
    stock_size = :stock_size,
    stock_size_uom = :stock_size_uom,
    stock_usage = :stock_usage,
    stock_usage_uom = :stock_usage_uom,
    stock_yields = :stock_yields,
    stock_cost = :stock_cost,
    other_cost = :other_cost,
    other_discounts = :other_discounts
WHERE product_id = :product_id;

/* @name UpdateInventoryStock */
UPDATE bph_inventory 
SET initial_stock = :initial_stock
WHERE product_id = :product_id;

/* @name DeleteInventoryItem */
DELETE FROM bph_inventory WHERE product_id = :product_id;
