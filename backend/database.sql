CREATE DATABASE clinic;

CREATE TABLE patientinformation(
    ID SERIAL PRIMARY KEY,
    nameLast VARCHAR(40),
    nameFirst VARCHAR(40),
    nameMiddle VARCHAR(40),
    dateOfEntry DATE,
    dateOfBirth DATE,
    civilStatus VARCHAR(40),
    patientAddress VARCHAR(255),
    patientGender VARCHAR(40),
    patientheight DECIMAL,
    patientweight DECIMAL,
    numberTelephone VARCHAR(10),
    numberMobile VARCHAR(10),
    email CITEXT(255),
    occupation VARCHAR(255)
);

CREATE TABLE emergencyperson(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT patientID
        FOREIGN KEY(ID) 
        REFERENCES patientinformation(ID),
    nameLast VARCHAR(40),
    nameFirst VARCHAR(40),
    numberTelephone VARCHAR(10),
    numberMobile VARCHAR(10)
);

CREATE TABLE parent(
    ID SERIAL PRIMARY KEY,
    nameLast VARCHAR(40),
    nameFirst VARCHAR(40),
    numberTelephone VARCHAR(10),
    numberMobile VARCHAR(10)
);