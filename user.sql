CREATE TABLE tbl_user (
    userid INT PRIMARY KEY,
    namalengkap VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(80) NOT NULL,
    status CHAR(1) NOT NULL
);