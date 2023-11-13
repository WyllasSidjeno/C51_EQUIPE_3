SELECT c.id, u.username, c.date_creation, c.message
FROM commentaire c
JOIN User u ON c.user_id = u.id
GROUP BY c.id, u.username, c.date_creation, c.message;
