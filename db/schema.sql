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
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role(
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (id)
);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Tony", "Stark", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Steven", "Rogers", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bruce", "Banner", 2, 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Nick", "Fury", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Natasha", "Romanoff", 3, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Thor", "Asgard", 3, 4);


INSERT INTO department (dept_name)
VALUES ("Management");
INSERT INTO department (dept_name)
VALUES ("Engineering");
INSERT INTO department (dept_name)
VALUES ("Finance");
INSERT INTO department (dept_name)
VALUES ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ("Engineer", 80000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 65000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ("Paralegal", 60000, 4);
