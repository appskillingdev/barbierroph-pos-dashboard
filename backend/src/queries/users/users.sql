/* @name CreateUser */
INSERT INTO bph_users ("ID", user_id, email_address, password, full_name, user_type, full_picture, social_media, complete_address, contact_number)
VALUES (:ID, :user_id, :email_address, :password, :full_name, :user_type, :full_picture, :social_media, :complete_address, :contact_number);

/* @name GetAllUsers */
SELECT * FROM bph_users ORDER BY created_at DESC;

/* @name GetUserById */
SELECT * FROM bph_users WHERE "ID" = :ID;

/* @name GetUserByUserId */
SELECT * FROM bph_users WHERE user_id = :user_id;

/* @name GetUserByEmail */
SELECT * FROM bph_users WHERE email_address = :email_address;

/* @name UpdateUser */
UPDATE bph_users 
SET user_id = :user_id,
    email_address = :email_address,
    full_name = :full_name,
    full_picture = :full_picture,
    user_type = :user_type,
    social_media = :social_media,
    complete_address = :complete_address,
    contact_number = :contact_number
WHERE "ID" = :ID;

/* @name UpdateUserPassword */
UPDATE bph_users 
SET password = :password
WHERE "ID" = :ID;

/* @name DeleteUser */
DELETE FROM bph_users WHERE "ID" = :ID;
