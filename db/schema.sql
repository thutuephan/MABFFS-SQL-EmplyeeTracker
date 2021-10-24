
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE  company_db;

--Department table--
CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
)
