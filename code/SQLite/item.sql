CREATE TABLE Item_type (
    ID                  INT             NOT NULL    PRIMARY KEY ,
    name                VARCHAR(32)     NOT NULL,
    icon                BLOB            NOT NULL
);

CREATE TABLE Item (
    ID                  INT             NOT NULL    PRIMARY KEY ,
    item_type_id        INT             NOT NULL,

    FOREIGN KEY (item_type_id) REFERENCES  Item_type(ID)
        ON DELETE CASCADE
);

CREATE TABLE Item_modifier (
    ID                  INT             NOT NULL    PRIMARY KEY ,
    item_id             INT             NOT NULL,
    modifier_name_id    INT             NOT NULL,
    modifier_value      INT             NOT NULL,

    FOREIGN KEY(item_id) REFERENCES  Item(ID)
        ON DELETE CASCADE
);
