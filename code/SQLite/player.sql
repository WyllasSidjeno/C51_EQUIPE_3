CREATE TABLE Player(
    ID          INT         NOT NULL    PRIMARY KEY,
    Username    VARCHAR(16)
);

CREATE TABLE Password(
    ID              INT     NOT NULL    PRIMARY KEY,
    username_id     INT,
    password_hash   TEXT    NOT NULL,
    SALT            TEXT    NOT NULL,

    FOREIGN KEY(username_id) REFERENCES Player(ID)
);