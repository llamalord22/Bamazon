DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (

item_id INTEGER NOT NULL AUTO_INCREMENT,

product_name VARCHAR(30) NOT NULL,

department_name VARCHAR(30) NOT NULL,

price INTEGER(10) NOT NULL,

stock_quantity INTEGER(10),

PRIMARY KEY(item_id)

);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES

("Llama", "Animals", 500, 5),
("Penguin", "Animals", 125, 2),
("Doritos", "Food", 3, 10),
("Pringles", "Food", 1, 7),
("Optimus Prime", "Toys", 25, 5),
("Light-Saber", "Toys", 30, 3),
("Clue", "Games", 40, 4),
("Settlers of Catan", "Games", 60, 2),
("Jelly Fish", "Animals", 300, 30),
("The One Ring", "Jewelry", 500000, 1)
