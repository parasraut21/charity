create database charity1;
use charity1;

CREATE TABLE donors (
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL PRIMARY KEY,
  cpassword VARCHAR(255) NOT NULL,
  confirmPassword VARCHAR(255) NOT NULL
);
select * from donors;

CREATE TABLE NGO (
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL PRIMARY KEY,
  cpassword VARCHAR(255) NOT NULL,
  confirmPassword VARCHAR(255) NOT NULL
);
select * from ngos;

CREATE TABLE ADMIN (
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL PRIMARY KEY,
  cpassword VARCHAR(255) NOT NULL,
  confirmPassword VARCHAR(255) NOT NULL
);
select * from admins;

CREATE TABLE project (
  NGOEmail VARCHAR(255) NOT NULL,
  projectname VARCHAR(255) NOT NULL,
  filename VARCHAR(255) NOT NULL,
  pptData LONGBLOB NOT NULL,
  PRIMARY KEY (NGOEmail, projectname),
  FOREIGN KEY (NGOEmail) REFERENCES NGO(email)
);
select * from projects;

CREATE TABLE donations (
  NGOEmail VARCHAR(255) NOT NULL,
  DONOREmail VARCHAR(255) NOT NULL,
  projectname VARCHAR(255) NOT NULL,
  Donation VARCHAR(255) NOT NULL,
  PRIMARY KEY (NGOEmail, DONOREmail, projectname),
  FOREIGN KEY (NGOEmail) REFERENCES NGO(email),
  FOREIGN KEY (DONOREmail) REFERENCES donors(email)
);
select * from donations;

CREATE TABLE review_results (
  NGOEmail VARCHAR(255) NOT NULL,
  projectname VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  PRIMARY KEY (NGOEmail, projectname),
  FOREIGN KEY (NGOEmail) REFERENCES NGO(email)
);
select * from review_results;









drop table projects;
drop table review_results;
drop table donations;
drop table admins;
drop table donors;
drop table ngos;