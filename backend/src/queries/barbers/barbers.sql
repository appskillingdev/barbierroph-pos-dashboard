/* @name CreateBarber */
INSERT INTO bph_barbers (barber_id, branch_id, position, full_name, address, commission, picture, social_media, email_address, date_availability)
VALUES (:barber_id, :branch_id, :position, :full_name, :address, :commission, :picture, :social_media, :email_address, :date_availability)
RETURNING *;

/* @name GetAllBarbers */
SELECT * FROM bph_barbers ORDER BY full_name;

/* @name GetBarberById */
SELECT b.*,
    ARRAY(SELECT bb.branch_id FROM bph_barber_branches bb WHERE bb.barber_id = b.barber_id ORDER BY bb.branch_id) AS branch_ids
FROM bph_barbers b
WHERE b.barber_id = :barber_id;

/* @name GetBarbersByBranch */
SELECT b.* FROM bph_barbers b
JOIN bph_barber_branches bb ON bb.barber_id = b.barber_id
WHERE bb.branch_id = :branch_id
ORDER BY b.full_name;

/* @name GetBarbersByPosition */
SELECT * FROM bph_barbers WHERE position = :position ORDER BY full_name;

/* @name UpdateBarber */
UPDATE bph_barbers 
SET branch_id = :branch_id,
    position = :position,
    full_name = :full_name,
    address = :address,
    commission = :commission,
    picture = :picture,
    social_media = :social_media,
    email_address = :email_address,
    date_availability = :date_availability
WHERE barber_id = :barber_id
RETURNING *;

/* @name DeleteBarber */
DELETE FROM bph_barbers WHERE barber_id = :barber_id
RETURNING *;

/* @name AssignBarberToBranch */
INSERT INTO bph_barber_branches (barber_id, branch_id)
VALUES (:barber_id, :branch_id)
ON CONFLICT DO NOTHING
RETURNING *;

/* @name UnassignBarberFromBranch */
DELETE FROM bph_barber_branches WHERE barber_id = :barber_id AND branch_id = :branch_id
RETURNING *;

/* @name GetBranchesByBarber */
SELECT br.* FROM bph_branches br
JOIN bph_barber_branches bb ON bb.branch_id = br.branch_id
WHERE bb.barber_id = :barber_id
ORDER BY br.branch_id;
