CREATE DATABASE clinic;

\c clinic

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
    email VARCHAR(255),
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
    CONSTRAINT patientID
        FOREIGN KEY(ID) 
            REFERENCES patientinformation(ID),
    nameLast VARCHAR(40),
    nameFirst VARCHAR(40),
    numberTelephone VARCHAR(10),
    numberMobile VARCHAR(10)
);

CREATE TABLE dentistinformation(
    ID SERIAL PRIMARY KEY,
    nameLast VARCHAR(40),
    nameFirst VARCHAR(40),
    nameMiddle VARCHAR(40),
    email VARCHAR(255),
    numberTelephone VARCHAR(10),
    numberMobile VARCHAR(10),
    numberPRC VARCHAR(7),
    occupation VARCHAR(255)
);

CREATE TABLE assistantinformation(
    ID SERIAL PRIMARY KEY,
    nameLast VARCHAR(40),
    nameFirst VARCHAR(40),
    nameMiddle VARCHAR(40),
    email VARCHAR(255),
    numberMobile VARCHAR(10)
);

CREATE TABLE thirdpartyinformation(
    ID SERIAL PRIMARY KEY,
    thidPartyName VARCHAR(255),
    affiliation VARCHAR(255),
    email VARCHAR(255),
    numberTelephone VARCHAR(10),
    numberMobile VARCHAR(10)
);

CREATE TABLE directory(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT thirdPartyID
        FOREIGN KEY(ID) 
            REFERENCES thirdpartyinformation(ID)
);

CREATE TABLE log(
    ID SERIAL PRIMARY KEY,
    timeIn TIMESTAMP,
    timeOut TIMESTAMP
);

CREATE TABLE dentistlogentry(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT dentistID
        FOREIGN KEY(ID) 
            REFERENCES dentistinformation(ID),
    CONSTRAINT logID
        FOREIGN KEY(ID) 
            REFERENCES log(ID)
);

CREATE TABLE assistantlogentry(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT assistantID
        FOREIGN KEY(ID) 
            REFERENCES assistantinformation(ID),
    CONSTRAINT logID
        FOREIGN KEY(ID) 
            REFERENCES log(ID)
);

CREATE TABLE thirdpartylogentry(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT thirdPartyID
        FOREIGN KEY(ID) 
            REFERENCES thirdpartyinformation(ID),
    CONSTRAINT logID
        FOREIGN KEY(ID) 
            REFERENCES log(ID)
);

CREATE TABLE appointment(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT patientID
        FOREIGN KEY(ID)
            REFERENCES patientinformation(ID),
    CONSTRAINT dentistID
        FOREIGN KEY(ID)
            REFERENCES dentistinformation(ID),
    appointmentDate DATE,
    timeStart TIMESTAMP,
    timeEnd TIMESTAMP
);

CREATE TABLE procedure(
    ID SERIAL PRIMARY KEY,
    name VARCHAR(40),
    description TEXT,
    baseCost DECIMAL
);

CREATE TABLE appointmentProcedure(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT appointmentID
        FOREIGN KEY(ID)
            REFERENCES appointment(ID),
    CONSTRAINT procedureID
        FOREIGN KEY(ID)
            REFERENCES procedure(ID),
    notes TEXT
);

CREATE TABLE appointmentHistory(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT patientID
        FOREIGN KEY(ID)
            REFERENCES patientinformation(ID),
    CONSTRAINT appointmentID
        FOREIGN KEY(ID)
            REFERENCES appointment(ID),
    status BIT
);

CREATE TABLE invoice(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT patientID
        FOREIGN KEY(ID)
            REFERENCES patientinformation(ID),
    CONSTRAINT dentistID
        FOREIGN KEY(ID)
            REFERENCES dentistinformation(ID),
    feesProcedureTotal decimal,
    feesLaboratory decimal,
    discount decimal,
    subTotal decimal,
    feesDoctor decimal,
    shareDoctor decimal,
    shareClinic decimal,
    notes text
);

CREATE TABLE billingHistory(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT patientID
        FOREIGN KEY(ID)
            REFERENCES patientinformation(ID),
    CONSTRAINT invoiceID
        FOREIGN KEY(ID)
            REFERENCES invoiceID(ID),
    unpaid bit,
    partial bit,
    complete bit
);

CREATE TABLE invoiceProcedure(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT invoiceID
        FOREIGN KEY(ID)
            REFERENCES invoiceID(ID),
    CONSTRAINT procedureID
        FOREIGN KEY(ID)
            REFERENCES procedure(ID),
    teethQuantity INTEGER,
    fee DECIMAL
);

CREATE TABLE imagetype(
    ID SERIAL PRIMARY KEY,
    name VARCHAR(40),
    description TEXT
);

CREATE TABLE image(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT patientID
        FOREIGN KEY(ID)
            REFERENCES patientinformation(ID),
    CONSTRAINT imageTypeID
        FOREIGN KEY(ID)
            REFERENCES imagetype(ID),
    creationDate DATE,
    filePath VARCHAR(255)
);

CREATE TABLE imageChronology(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT patientID
        FOREIGN KEY(ID)
            REFERENCES patientinformation(ID),
    CONSTRAINT imageID
        FOREIGN KEY(ID)
            REFERENCES image(ID),
    date DATE,
    notes TEXT
);

CREATE TABLE toothType(
    ID SERIAL PRIMARY KEY,
    name VARCHAR(40),
    description TEXT
);

CREATE TABLE crownType(
    ID SERIAL PRIMARY KEY,
    name VARCHAR(40),
    description TEXT
);

CREATE TABLE layType(
    ID SERIAL PRIMARY KEY,
    name VARCHAR(40),
    description TEXT
);

CREATE TABLE dentalChart(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT patientID
        FOREIGN KEY(ID)
            REFERENCES patientinformation(ID),
    CONSTRAINT dentistID
        FOREIGN KEY(ID)
            REFERENCES dentistinformation(ID),
    date DATE,
    note TEXT
);

CREATE TABLE dentalChartTooth(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT dentalChartID
        FOREIGN KEY(ID)
            REFERENCES dentalChart(ID),
    CONSTRAINT toothTypeID
        FOREIGN KEY(ID)
            REFERENCES toothType(ID),
    CONSTRAINT crownTypeID
        FOREIGN KEY(ID)
            REFERENCES crownType(ID),
    CONSTRAINT layTypeID
        FOREIGN KEY(ID)
            REFERENCES layType(ID),
    number INTEGER,
    status BIT(5),
    caries BIT(5),
    composite BIT(5),
    amalgam BIT(5),
    reccurentCaries BIT(5),
    lay BIT(5)
);

CREATE TABLE dentalChartHistory(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT patientID
        FOREIGN KEY(ID)
            REFERENCES patientinformation(ID),
    CONSTRAINT dentalChartID
        FOREIGN KEY(ID)
            REFERENCES dentalChart(ID)
    date DATE,
    notes TEXT
);

CREATE TABLE medicalHistory(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT patientID
        FOREIGN KEY(ID)
            REFERENCES patientinformation(ID),
    date DATE,
    filePath VARCHAR(255)
);

CREATE TABLE formType(
    ID SERIAL PRIMARY KEY,
    name NAME,
    description TEXT
);

CREATE TABLE form(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT patientID
        FOREIGN KEY(ID)
            REFERENCES patientinformation(ID),
    CONSTRAINT dentistID
        FOREIGN KEY(ID)
            REFERENCES dentistinformation(ID),
    CONSTRAINT formTypeID
        FOREIGN KEY(ID)
            REFERENCES formType(ID),
    date DATE,
    filePath VARCHAR(255)
);

CREATE TABLE medicine(
    ID SERIAL PRIMARY KEY,
    name NAME,
    description TEXT,
    dosage VARCHAR(20),
    dosageChild VARCHAR(20)
);

CREATE TABLE prescription(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT patientID
        FOREIGN KEY(ID)
            REFERENCES patientinformation(ID),
    CONSTRAINT dentistID
        FOREIGN KEY(ID)
            REFERENCES dentistinformation(ID),
    date DATE
);

CREATE TABLE medication(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT prescriptionID
        FOREIGN KEY(ID)
            REFERENCES prescription(ID),
    CONSTRAINT medicineID
        FOREIGN KEY(ID)
            REFERENCES medicine(ID),
    quantity INTEGER,
    signetur TEXT
);

CREATE TABLE prescriptionHistory(
    ID SERIAL PRIMARY KEY,
    CONSTRAINT patientID
        FOREIGN KEY(ID)
            REFERENCES patientinformation(ID),
    CONSTRAINT prescriptionID
        FOREIGN KEY(ID)
            REFERENCES prescription(ID),
    date DATE
);