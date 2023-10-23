SELECT c.id, u.username, c.date_creation, c.message,
  COALESCE(GROUP_CONCAT(rc.message), 'Nulle') AS rc_messages
FROM commentaire c
JOIN User u ON c.user_id = u.id
LEFT JOIN reponse_commentaire rc ON c.id = rc.commentaire_id
GROUP BY c.id, u.username, c.date_creation, c.message;
