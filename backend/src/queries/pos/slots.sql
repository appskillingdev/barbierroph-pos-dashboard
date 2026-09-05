/* @name CreateSlot */
INSERT INTO pos_slots (id, branch_id, slot_id, assigned_barber, status)
VALUES (:id, :branch_id, :slot_id, :assigned_barber, :status);

/* @name GetAllSlots */
SELECT * FROM pos_slots ORDER BY branch_id, slot_id;

/* @name GetSlotById */
SELECT * FROM pos_slots WHERE id = :id;

/* @name GetSlotsByBranch */
SELECT * FROM pos_slots WHERE branch_id = :branch_id ORDER BY slot_id;

/* @name GetSlotsByBarber */
SELECT * FROM pos_slots WHERE assigned_barber = :assigned_barber ORDER BY slot_id;

/* @name GetSlotsByStatus */
SELECT * FROM pos_slots WHERE status = :status ORDER BY branch_id, slot_id;

/* @name GetAvailableSlotsByBranch */
SELECT * FROM pos_slots WHERE branch_id = :branch_id AND status = 'available' ORDER BY slot_id;

/* @name UpdateSlot */
UPDATE pos_slots 
SET branch_id = :branch_id,
    slot_id = :slot_id,
    assigned_barber = :assigned_barber,
    status = :status
WHERE id = :id;

/* @name UpdateSlotStatus */
UPDATE pos_slots 
SET status = :status
WHERE id = :id;

/* @name DeleteSlot */
DELETE FROM pos_slots WHERE id = :id;
