SELECT c.id, u.username, c.date_creation, c.message, GROUP_CONCAT(rc.message) AS rc_messages
FROM commentaire c, User u
JOIN reponse_commentaire rc ON c.ID = rc.commentaire_id
GROUP BY c.id, c.user_id, c.date_creation, c.message;
