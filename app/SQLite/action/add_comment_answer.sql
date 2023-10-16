insert into reponse_commentaire (user_id, commentaire_id, date_creation, message)
SELECT u.id, ?, time(), ?
FROM User u
JOIN User ON u.username = ?