CREATE DATABASE myshopping;

USE myshopping;

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id VARCHAR(255) NOT NULL,
  product_image VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  customer_data TEXT NOT NULL
);

CREATE TABLE inventory (
  product_id INT PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  stock INT NOT NULL
);

CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_data VARCHAR(255) NOT NULL,
    product_image VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO inventory (product_id, product_name, stock) VALUES
(1, 'Bulbasaur', 50),
(2, 'Ivysaur', 30),
(3, 'Venusaur', 20),
(4, 'Charmander', 60),
(5, 'Charmeleon', 25),
(6, 'Charizard', 15),
(7, 'Squirtle', 55),
(8, 'Wartortle', 35),
(9, 'Blastoise', 18),
(10, 'Caterpie', 80),
(11, 'Metapod', 40),
(12, 'Butterfree', 22),
(13, 'Weedle', 70),
(14, 'Kakuna', 45),
(15, 'Beedrill', 25),
(16, 'Pidgey', 65),
(17, 'Pidgeotto', 33),
(18, 'Pidgeot', 19),
(19, 'Rattata', 75),
(20, 'Raticate', 28);