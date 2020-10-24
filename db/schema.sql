DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE department(
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joy", "Meredith", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jordan", "Becker", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kalea", "Becker", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Caplette", 1, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dan", "Kral", 3, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Matt", "Torcellini", 3, 4);

INSERT INTO department (name)
VALUES ("Management");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 60000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Paralegal", 65000, 4);

USE employee_db;

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;

SELECT first_name, last_name, title
FROM employee
LEFT JOIN role ON employee.role_id = role.id;

SELECT first_name, last_name, title, name
FROM employee LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id;