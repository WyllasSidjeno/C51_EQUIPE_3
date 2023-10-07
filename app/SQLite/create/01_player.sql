CREATE TABLE User(
    ID          INTEGER         NOT NULL    PRIMARY KEY AUTOINCREMENT ,
    username    VARCHAR(16)     NOT NULL    UNIQUE
);

CREATE TABLE Password(
    ID              INTEGER     NOT NULL    PRIMARY KEY AUTOINCREMENT ,
    user_id     INTEGER,
    hash            TEXT    NOT NULL,
    salt            TEXT    NOT NULL,

    FOREIGN KEY(user_id) REFERENCES User(ID)
        ON DELETE CASCADE
);