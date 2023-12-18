INSERT INTO commentaire (user_id, date_creation, message)
SELECT u.id, time(), ?
FROM User u
JOIN User a ON u.username = a.username
WHERE u.username = ?;
