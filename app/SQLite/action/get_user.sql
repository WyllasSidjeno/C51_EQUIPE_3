SELECT User.username, Password.hash, Password.salt
FROM User
INNER JOIN Password ON User.id = Password.user_id
WHERE User.username = ?