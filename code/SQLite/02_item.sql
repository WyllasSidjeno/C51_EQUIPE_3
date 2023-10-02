CREATE TABLE Item_type (
    ID                  INTEGER             NOT NULL    PRIMARY KEY     AUTOINCREMENT ,
    name                VARCHAR(32)     NOT NULL,
    icon_name           VARCHAR(16)     NOT NULL
);

CREATE TABLE Item (
    ID             INTEGER              NOT NULL    PRIMARY KEY         AUTOINCREMENT,
    type_id        INTEGER              NOT NULL,
    name           VARCHAR(32)      NOT NULL,

    FOREIGN KEY (type_id) REFERENCES  Item_type(ID)
        ON DELETE CASCADE
);

CREATE TABLE Item_modifier (
    ID                  INTEGER             NOT NULL    PRIMARY KEY     AUTOINCREMENT ,
    item_id             INTEGER             NOT NULL,
    modifier_type_id    INTEGER             NOT NULL,
    modifier_value      INTEGER             NOT NULL,

    FOREIGN KEY(item_id) REFERENCES  Item(ID)
        ON DELETE CASCADE,
    FOREIGN KEY (modifier_value) REFERENCES Modifier_types(ID)
        ON DELETE CASCADE
);

CREATE TABLE Modifier_types (
    ID      INTEGER         NOT NULL        PRIMARY KEY         AUTOINCREMENT ,
    name    VARCHAR(16) NOT NULL        UNIQUE
);

CREATE TABLE Player_item (
    ID          INTEGER         NOT NULL        PRIMARY KEY     AUTOINCREMENT,
    player_id   INTEGER         NOT NULL,
    item_id     INTEGER         NOT NULL,

    FOREIGN KEY (player_id) REFERENCES Player(id)
        ON DELETE CASCADE,
    FOREIGN KEY (item_id)   REFERENCES Item(id)
        ON DELETE CASCADE
);
