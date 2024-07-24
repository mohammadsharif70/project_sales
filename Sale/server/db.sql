/*creating database for project*/
create database beed_sales;
use beed_sales;
/*creating first table user_profile*/
create table user_profile(
UserID int auto_increment primary key ,
UserName varchar(100) NOT NULL ,
LoginID varchar(50) not null ,
Password varchar(50) not null ,
UserRole varchar(100) ,
ReportingManager varchar(150)

);

--creating second table salestransaction
create table salestransactions (
TransactionID int auto_increment primary key,
SalesItem varchar(100) not null ,
SalesDate  datetime,
UserID int not null , 
Amount decimal(13,2) ,
UpdatedDate timestamp ON UPDATE CURRENT_TIMESTAMP ,
foreign key (UserID) references user_profile(UserID)
);

-- FAKE USERS and ADMINS

INSERT INTO user_profile (UserName, LoginID, Password, UserRole, ReportingManager)
VALUES
('John Doe', 'jdoe', 'password123', 'Admin', 'Jane Smith'),
('Jane Smith', 'jsmith', 'securepass', 'Admin', 'Robert Brown'),
('Alice Johnson', 'ajohnson', 'mypassword', 'Seller', 'Jane Smith'),
('Bob Williams', 'bwilliams', 'passw0rd', 'Seller', 'Jane Smith'),
('Robert Brown', 'rbrown', 'password!', 'Seller', 'NULL');

-- SELLER

INSERT INTO salestransactions (SalesItem, SalesDate, UserID, Amount)
VALUES
('Laptop', '2023-03-01 10:00:00', 3, 1200.50),
('Smartphone', '2023-02-02 11:30:00', 3, 800.75),
('Tablet', '2023-05-03 14:45:00', 5, 300.00),
('Monitor', '2023-03-04 09:20:00', 5, 150.25),
('Keyboard', '2023-02-05 13:10:00', 5, 45.00),
('Mouse', '2023-01-06 15:50:00', 5, 25.00),
('Printer', '2023-01-07 10:40:00', 5, 200.00),
('Desk', '2023-02-08 12:30:00', 4, 175.00),
('Chair', '2023-04-09 16:10:00', 4, 85.00),
('Router', '2023-06-10 11:00:00', 3, 60.00);