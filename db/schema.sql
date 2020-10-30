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
VALUES ("Joy", "Meredith", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jordan", "Becker", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kalea", "Becker", 2, 1);
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Ryan", "Caplette", 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dan", "Kral", 3, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Matt", "Torcellini", 3, 4);

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

USE employee_db;

SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM role;

-- view employees and titles -- 
SELECT first_name, last_name, title
FROM employee
LEFT JOIN role ON employee.role_id = role.id;

-- view employees titles depts -- 
SELECT first_name, last_name, title, dept_name
FROM employee LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id;

-- view by department -- 
SELECT dept_name, title, first_name, last_name
FROM employee LEFT JOIN role ON employee.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
WHERE department_id = 1;

SELECT * FROM employee ORDER BY manager_id;

-- view by manager ? -- 
SELECT dept_name, title, first_name, last_name
FROM employee LEFT JOIN role ON employee.role_id = role.id 
LEFT JOIN department ON role.department_id = department_id 
ORDER BY department_id;
