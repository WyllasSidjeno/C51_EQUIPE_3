insert into commentaire (user_id, date_creation, message)
SELECT u.id, time(), ?
FROM User u
JOIN User ON u.username = ?