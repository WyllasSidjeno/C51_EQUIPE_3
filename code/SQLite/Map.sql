CREATE TABLE Map(
    ID      INT             NOT NULL    PRIMARY KEY,
    nom     VARCHAR(32)     NOT NULL,
    width   INT             NOT NULL,
    height  INT             NOT NULL
);

CREATE TABLE Map_tile(
    ID              INT     NOT NULL,
    map_id          INT     NOT NULL,

    x_cords         INT     NOT NULL,
    y_cords         INT     NOT NULL,
    tiles_type_id   INT     NOT NULL,

    FOREIGN KEY (map_id) REFERENCES  Map(ID)
);

CREATE TABLE Player_map(
    ID          INT     NOT NULL    PRIMARY KEY ,
    player_id   INT     NOT NULL,
    map_id      INT     NOT NULL,

    checkpoint_id       INT     NOT NULL,
    tempative_score     INT     NOT NULL,

    FOREIGN KEY (player_id) REFERENCES Player(ID),
    FOREIGN KEY (map_id) REFERENCES Map(ID)
);

CREATE TABLE Map_enemies(
    ID              INT     NOT NULL  PRIMARY KEY ,
    player_map_id   INT     NOT NULL ,

    x_cords         INT     NOT NULL ,
    y_cords         INT     NOT NULL ,
    enemy_type      INT     NOT NULl,

    FOREIGN KEY (player_map_id) REFERENCES Player_map(ID)
);

CREATE TABLE Score(
    ID          INT     NOT NULL    PRIMARY KEY ,
    player_id   INT     NOT NULL,
    map_id      INT     NOT NULL,

    score       INT     NOT NULL,

    FOREIGN KEY (player_id) REFERENCES Player(ID),
    FOREIGN KEY (map_id) REFERENCES Map(ID)
);

