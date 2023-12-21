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
    patientID INT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patientID) 
            REFERENCES patientinformation(ID)
                ON DELETE CASCADE,
    nameLast VARCHAR(40),
    nameFirst VARCHAR(40),
    numberTelephone VARCHAR(10),
    numberMobile VARCHAR(10)
);

CREATE TABLE parent(
    ID SERIAL PRIMARY KEY,
    patientID INT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patientID) 
            REFERENCES patientinformation(ID)
                ON DELETE CASCADE,
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
    numberPRC VARCHAR(7)
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
    thirdPartyID INT,
    CONSTRAINT fk_thirdParty
        FOREIGN KEY(thirdPartyID) 
            REFERENCES thirdpartyinformation(ID)
                ON DELETE CASCADE
);

CREATE TABLE log(
    ID SERIAL PRIMARY KEY,
    timeIn TIMESTAMP,
    timeOut TIMESTAMP
);

CREATE TABLE dentistlogentry(
    ID SERIAL PRIMARY KEY,
    dentistID INT,
    CONSTRAINT fk_dentist
        FOREIGN KEY(dentistID) 
            REFERENCES dentistinformation(ID)
                ON DELETE CASCADE,
    logID INT,
    CONSTRAINT fk_log
        FOREIGN KEY(logID) 
            REFERENCES log(ID)
                ON DELETE CASCADE
);

CREATE TABLE assistantlogentry(
    ID SERIAL PRIMARY KEY,
    assistantID INT,
    CONSTRAINT fk_assistant
        FOREIGN KEY(assistantID) 
            REFERENCES assistantinformation(ID)
                ON DELETE CASCADE,
    logID INT,
    CONSTRAINT fk_log
        FOREIGN KEY(logID) 
            REFERENCES log(ID)
                ON DELETE CASCADE
);

CREATE TABLE thirdpartylogentry(
    ID SERIAL PRIMARY KEY,
    thirdPartyID INT,
    CONSTRAINT fk_thirdParty
        FOREIGN KEY(thirdPartyID) 
            REFERENCES thirdpartyinformation(ID)
                ON DELETE CASCADE,
    logID INT,
    CONSTRAINT fk_log
        FOREIGN KEY(logID) 
            REFERENCES log(ID)
                ON DELETE CASCADE
);

CREATE TABLE appointment(
    ID SERIAL PRIMARY KEY,
    patientID INT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patientID)
            REFERENCES patientinformation(ID)
                ON DELETE CASCADE,
    dentistID INT,
    CONSTRAINT fk_dentist
        FOREIGN KEY(dentistID)
            REFERENCES dentistinformation(ID)
                ON DELETE CASCADE,
    appointmentDate DATE,
    timeStart TIMESTAMP,
    timeEnd TIMESTAMP
);

CREATE TABLE appointmentProcedure(
    ID SERIAL PRIMARY KEY,
    appointmentID INT,
    CONSTRAINT fk_appointment
        FOREIGN KEY(appointmentID)
            REFERENCES appointment(ID)
                ON DELETE CASCADE,
    procedure TEXT,
    notes TEXT
);

CREATE TABLE appointmentHistory(
    ID SERIAL PRIMARY KEY,
    patientID INT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patientID)
            REFERENCES patientinformation(ID)
                ON DELETE CASCADE,
    appointmentID INT,
    CONSTRAINT fk_appointment
        FOREIGN KEY(appointmentID)
            REFERENCES appointment(ID)
                ON DELETE CASCADE,
    status BOOLEAN
);

CREATE TABLE image(
    ID SERIAL PRIMARY KEY,
    patientID INT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patientID)
            REFERENCES patientinformation(ID)
                ON DELETE CASCADE,
    imageType TEXT,
    creationDate DATE,
    filePath VARCHAR(255)
);

CREATE TABLE imageChronology(
    ID SERIAL PRIMARY KEY,
    patientID INT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patientID)
            REFERENCES patientinformation(ID)
                ON DELETE CASCADE,
    imageID INT,
    CONSTRAINT fk_image
        FOREIGN KEY(imageID)
            REFERENCES image(ID)
                ON DELETE CASCADE,
    date DATE,
    notes TEXT
);

CREATE TABLE dentalChart(
    ID SERIAL PRIMARY KEY,
    patientID INT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patientID)
            REFERENCES patientinformation(ID)
                ON DELETE CASCADE,
    dentistID INT,
    CONSTRAINT fk_dentist
        FOREIGN KEY(dentistID)
            REFERENCES dentistinformation(ID)
                ON DELETE CASCADE,
    date DATE,
    note TEXT
);

CREATE TABLE dentalChartTooth(
    ID SERIAL PRIMARY KEY,
    dentalChartID INT,
    CONSTRAINT fk_dentalchart
        FOREIGN KEY(dentalChartID)
            REFERENCES dentalChart(ID)
                ON DELETE CASCADE,
    teethNumber DECIMAL(2),
    statusBits BIT(3),
    layCrownTypeBits BIT(3),
    lay BIT(5),
    recurringCarries BIT(5),
    amalgam BIT(5),
    composite BIT(5),
    carries BIT(5)
);

CREATE TABLE dentalChartHistory(
    ID SERIAL PRIMARY KEY,
    patientID INT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patientID)
            REFERENCES patientinformation(ID)
                ON DELETE CASCADE,
    dentalChartID INT,
    CONSTRAINT fk_dentalchart
        FOREIGN KEY(dentalChartID)
            REFERENCES dentalChart(ID)
                ON DELETE CASCADE,
    date DATE,
    notes TEXT
);

CREATE TABLE medicalHistory(
    ID SERIAL PRIMARY KEY,
    patientID INT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patientID)
            REFERENCES patientinformation(ID)
                ON DELETE CASCADE,
    date DATE,
    filePath VARCHAR(255)
);

CREATE TABLE form(
    ID SERIAL PRIMARY KEY,
    patientID INT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patientID)
            REFERENCES patientinformation(ID)
                ON DELETE CASCADE,
    dentistID INT,
    CONSTRAINT fk_dentist
        FOREIGN KEY(dentistID)
            REFERENCES dentistinformation(ID)
                ON DELETE CASCADE,
    formType VARCHAR(40),
    date DATE,
    filePath VARCHAR(255)
);

CREATE TABLE prescription(
    ID SERIAL PRIMARY KEY,
    patientID INT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patientID)
            REFERENCES patientinformation(ID)
                ON DELETE CASCADE,
    dentistID INT,
    CONSTRAINT fk_dentist
        FOREIGN KEY(dentistID)
            REFERENCES dentistinformation(ID)
                ON DELETE CASCADE,
    date DATE
);

CREATE TABLE medication(
    ID SERIAL PRIMARY KEY,
    prescriptionID INT,
    CONSTRAINT fk_prescription
        FOREIGN KEY(prescriptionID)
            REFERENCES prescription(ID)
                ON DELETE CASCADE,
    medicine VARCHAR(40),
    quantity INTEGER,
    signetur TEXT
);

CREATE TABLE prescriptionHistory(
    ID SERIAL PRIMARY KEY,
    patientID INT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patientID)
            REFERENCES patientinformation(ID)
                ON DELETE CASCADE,
    prescriptionID INT,
    CONSTRAINT fk_prescription
        FOREIGN KEY(prescriptionID)
            REFERENCES prescription(ID)
                ON DELETE CASCADE,
    date DATE
);

CREATE TABLE expense(
    ID SERIAL PRIMARY KEY,
    item VARCHAR(40),
    quantity DECIMAL,
    basecost DECIMAL,
    expense DECIMAL,
    isDeleted BOOLEAN DEFAULT false
);

CREATE TABLE downpaymentexpenses(
    ID SERIAL PRIMARY KEY,
    expenseid INT,
    CONSTRAINT fk_expense
        FOREIGN KEY(expenseid)
            REFERENCES expense(id)
);

CREATE TABLE billexpenses(
    ID SERIAL PRIMARY KEY,
    expenseid INT,
    CONSTRAINT fk_expense
        FOREIGN KEY(expenseid)
            REFERENCES expense(id)
);

CREATE TABLE equipmentexpenses(
    ID SERIAL PRIMARY KEY,
    expenseid INT,
    CONSTRAINT fk_expense
        FOREIGN KEY(expenseid)
            REFERENCES expense(id)
);

CREATE TABLE otherexpenses(
    ID SERIAL PRIMARY KEY,
    expenseid INT,
    CONSTRAINT fk_expense
        FOREIGN KEY(expenseid)
            REFERENCES expense(id)
);

CREATE TABLE invoice(
    ID SERIAL PRIMARY KEY,
    patientid INT,
    CONSTRAINT fk_patient
        FOREIGN KEY(patientid)
            REFERENCES patientinformation(id),
    total DECIMAL
);

CREATE TABLE procedure(
    ID SERIAL PRIMARY KEY,
    invoiceid INT,
    CONSTRAINT fk_invoice
        FOREIGN KEY(invoiceid)
            REFERENCES invoice(id),
    procedureName VARCHAR(40),
    description TEXT,
    cost DECIMAL
);