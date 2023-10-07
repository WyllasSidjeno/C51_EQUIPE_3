CREATE TABLE Map(
    ID      INTEGER             NOT NULL    PRIMARY KEY     AUTOINCREMENT,
    nom     VARCHAR(32)         NOT NULL    UNIQUE,
    width   INTEGER             NOT NULL,
    height  INTEGER             NOT NULL
);

CREATE TABLE Map_tile(
    ID              INTEGER             NOT NULL    PRIMARY KEY     AUTOINCREMENT ,
    map_id          INTEGER             NOT NULL,

    x_cords         INTEGER             NOT NULL,
    y_cords         INTEGER             NOT NULL,
    tiles_type      VARCHAR(16)         NOT NULL UNIQUE,

    FOREIGN KEY (map_id) REFERENCES  Map(ID)
        ON DELETE CASCADE
);

CREATE TABLE User_map(
    ID          INTEGER     NOT NULL    PRIMARY KEY         AUTOINCREMENT ,
    user_id     INTEGER     NOT NULL,
    map_id      INTEGER     NOT NULL,

    checkpoint_id       INTEGER     NOT NULL,
    tempative_score     INTEGER     NOT NULL,

    FOREIGN KEY (user_id) REFERENCES User(ID)
       ON DELETE CASCADE,
    FOREIGN KEY (map_id) REFERENCES Map(ID)
       ON DELETE CASCADE
);

CREATE TABLE Map_enemies(
    ID              INTEGER     NOT NULL  PRIMARY KEY       AUTOINCREMENT ,
    player_map_id   INTEGER     NOT NULL ,

    x_cords         INTEGER     NOT NULL ,
    y_cords         INTEGER     NOT NULL ,
    enemy_type      INTEGER     NOT NULl,

    FOREIGN KEY (player_map_id) REFERENCES User_map(ID)
        ON DELETE CASCADE
);

CREATE TABLE Score(
    ID          INTEGER     NOT NULL    PRIMARY KEY         AUTOINCREMENT ,
    user_id   INTEGER     NOT NULL,
    map_id      INTEGER     NOT NULL,

    score       INTEGER     NOT NULL,

    FOREIGN KEY (user_id) REFERENCES User(ID)
        ON DELETE CASCADE,
    FOREIGN KEY (map_id) REFERENCES Map(ID)
        ON DELETE CASCADE
);

