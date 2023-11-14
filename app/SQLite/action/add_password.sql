INSERT INTO Password(user_id, hash, salt)
VALUES (last_insert_rowid(), ?, ?);