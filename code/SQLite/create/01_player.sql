CREATE TABLE Player(
    ID          INTEGER         NOT NULL    PRIMARY KEY AUTOINCREMENT ,
    username    VARCHAR(16)     NOT NULL    UNIQUE
);

CREATE TABLE Password(
    ID              INTEGER     NOT NULL    PRIMARY KEY AUTOINCREMENT ,
    username_id     INTEGER,
    hash            TEXT    NOT NULL,
    salt            TEXT    NOT NULL,

    FOREIGN KEY(username_id) REFERENCES Player(ID)
        ON DELETE CASCADE
);