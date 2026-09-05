/* @name CreateInventoryCategory */
INSERT INTO bph_inventory_category (category_id, category_description)
VALUES (:category_id, :category_description);

/* @name GetAllInventoryCategories */
SELECT * FROM bph_inventory_category ORDER BY category_description;

/* @name GetInventoryCategoryById */
SELECT * FROM bph_inventory_category WHERE category_id = :category_id;

/* @name UpdateInventoryCategory */
UPDATE bph_inventory_category 
SET category_description = :category_description
WHERE category_id = :category_id;

/* @name DeleteInventoryCategory */
DELETE FROM bph_inventory_category WHERE category_id = :category_id;
