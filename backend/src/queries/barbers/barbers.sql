/* @name CreateBarber */
INSERT INTO bph_barbers (barber_id, branch_id, position, full_name, address, commission, picture, social_media, email_address)
VALUES (:barber_id, :branch_id, :position, :full_name, :address, :commission, :picture, :social_media, :email_address);

/* @name GetAllBarbers */
SELECT * FROM bph_barbers ORDER BY full_name;

/* @name GetBarberById */
SELECT * FROM bph_barbers WHERE barber_id = :barber_id;

/* @name GetBarbersByBranch */
SELECT * FROM bph_barbers WHERE branch_id = :branch_id ORDER BY full_name;

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
    email_address = :email_address
WHERE barber_id = :barber_id;

/* @name DeleteBarber */
DELETE FROM bph_barbers WHERE barber_id = :barber_id;
