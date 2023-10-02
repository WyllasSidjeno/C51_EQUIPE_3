CREATE TABLE commentaire(
    ID              INTEGER             NOT NULL    PRIMARY KEY     AUTOINCREMENT,
    user_id         INTEGER             NOT NULL,
    date_creation   DATE            NOT NULL,
    message         VARCHAR(140)
);

CREATE TABLE reponse_commentaire(
    ID              INTEGER             NOT NULL    PRIMARY KEY     AUTOINCREMENT,
    user_id         INTEGER             NOT NULL,
    commentaire_id  INTEGER             NOT NULL,

    date_creation   DATE            NOT NULL ,
    message         VARCHAR(140)    NOT NULL,

    FOREIGN KEY (user_id) REFERENCES Player(user_id)
        ON DELETE CASCADE,
    FOREIGN KEY (commentaire_id) REFERENCES commentaire(ID)
        ON DELETE CASCADE
);