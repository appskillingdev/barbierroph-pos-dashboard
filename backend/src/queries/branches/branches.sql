/* @name CreateBranch */
INSERT INTO bph_branches (branch_id, branch_owner, established_at, branch_location, branch_address, branch_image, social_media)
VALUES (:branch_id, :branch_owner, :established_at, :branch_location, :branch_address, :branch_image, :social_media);

/* @name GetAllBranches */
SELECT * FROM bph_branches ORDER BY branch_location;

/* @name GetBranchById */
SELECT * FROM bph_branches WHERE branch_id = :branch_id;

/* @name GetBranchesByOwner */
SELECT * FROM bph_branches WHERE branch_owner = :branch_owner ORDER BY established_at DESC;

/* @name GetBranchesByLocation */
SELECT * FROM bph_branches WHERE branch_location = :branch_location ORDER BY branch_address;

/* @name UpdateBranch */
UPDATE bph_branches 
SET branch_owner = :branch_owner,
    established_at = :established_at,
    branch_location = :branch_location,
    branch_address = :branch_address,
    branch_image = :branch_image,
    social_media = :social_media
WHERE branch_id = :branch_id;

/* @name DeleteBranch */
DELETE FROM bph_branches WHERE branch_id = :branch_id;
