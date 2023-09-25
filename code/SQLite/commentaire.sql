CREATE TABLE commentaire(
    ID              INT             NOT NULL    PRIMARY KEY ,
    user_id         INT             NOT NULL,
    date_creation   DATE            NOT NULL,
    message         VARCHAR(140)
)

CREATE TABLE reponse_commetaire(
    ID              INT             NOT NULL    PRIMARY KEY,
    user_id         INT             NOT NULL,
    commentaire_id  INT             NOT NULL,

    date_creation   DATE            NOT NULL ,
    message         VARCHAR(140)    NOT NULL,

    FOREIGN KEY (user_id) REFERENCES Player(user_id),
    FOREIGN KEY (commentaire_id) REFERENCES commentaire(ID)
)