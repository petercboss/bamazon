DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(30),
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  product_sales INT
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs INT NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tie Guan Yin", "Oolong", 11.20, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Da Hong Pao", "Oolong", 9.70, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wenshan Baozhong", "Oolong", 13.40, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pu'er", "Pu'er", 16.50, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Liubao", "Pu'er", 17.60, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Huangshan Maofeng", "Green", 3.60, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Xihu Longjing", "Green", 5.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("DongTing Biluochun", "Green", 8.60, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Silver Pekoe", "White", 11.20, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("White Peony", "White", 13.80, 20);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Oolong", 200);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Pu'er", 100);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Green", 200);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("White", 75);