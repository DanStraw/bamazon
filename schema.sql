drop database if exists bamazon;

create database bamazon;

use bamazon;

create table products (
    item_id integer(10) auto_increment not null,
    product_name varchar (50) not null,
    department_name varchar(30),
    price integer (20) not null,
    stock_quantity integer (20) not null,
    primary key (item_id)
);

insert into products (product_name, department_name, price, stock_quantity) 
values ('television', 'electronics', 500, 20);

insert into products (product_name, department_name, price, stock_quantity) 
values ('tennis shoes', 'apparel', 60, 10);

insert into products (product_name, department_name, price, stock_quantity) 
values ('soccer ball', 'sporting goods', 30, 100);

insert into products (product_name, department_name, price, stock_quantity) 
values ('blu-ray player', 'electronics', 150, 50);

insert into products (product_name, department_name, price, stock_quantity) 
values ('coffee maker', 'home appliances', 80, 75);

insert into products (product_name, department_name, price, stock_quantity) 
values ('t-shirt', 'apparel', 15, 200);

insert into products (product_name, department_name, price, stock_quantity) 
values ('fishing rod', 'sporting goods', 100, 30);

insert into products (product_name, department_name, price, stock_quantity) 
values ('oven', 'home appliances', 600, 5);

insert into products (product_name, department_name, price, stock_quantity) 
values ('sound bar', 'electronics', 200, 18);

insert into products (product_name, department_name, price, stock_quantity) 
values ('baseball glove', 'sporting goods', 40, 25);

select * from products;