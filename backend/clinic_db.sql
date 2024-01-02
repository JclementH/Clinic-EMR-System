--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointment (
    id integer NOT NULL,
    patientid integer,
    dentistid integer,
    appointmentdate date,
    timestart timestamp without time zone,
    timeend timestamp without time zone
);


ALTER TABLE public.appointment OWNER TO postgres;

--
-- Name: appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointment_id_seq OWNER TO postgres;

--
-- Name: appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointment_id_seq OWNED BY public.appointment.id;


--
-- Name: appointmenthistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointmenthistory (
    id integer NOT NULL,
    patientid integer,
    appointmentid integer,
    status boolean
);


ALTER TABLE public.appointmenthistory OWNER TO postgres;

--
-- Name: appointmenthistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointmenthistory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointmenthistory_id_seq OWNER TO postgres;

--
-- Name: appointmenthistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointmenthistory_id_seq OWNED BY public.appointmenthistory.id;


--
-- Name: appointmentprocedure; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointmentprocedure (
    id integer NOT NULL,
    appointmentid integer,
    procedure text,
    notes text
);


ALTER TABLE public.appointmentprocedure OWNER TO postgres;

--
-- Name: appointmentprocedure_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointmentprocedure_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointmentprocedure_id_seq OWNER TO postgres;

--
-- Name: appointmentprocedure_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointmentprocedure_id_seq OWNED BY public.appointmentprocedure.id;


--
-- Name: assistantinformation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assistantinformation (
    id integer NOT NULL,
    namelast character varying(40),
    namefirst character varying(40),
    namemiddle character varying(40),
    email character varying(255),
    numbermobile character varying(10)
);


ALTER TABLE public.assistantinformation OWNER TO postgres;

--
-- Name: assistantinformation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assistantinformation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.assistantinformation_id_seq OWNER TO postgres;

--
-- Name: assistantinformation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assistantinformation_id_seq OWNED BY public.assistantinformation.id;


--
-- Name: assistantlogentry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.assistantlogentry (
    id integer NOT NULL,
    assistantid integer,
    logid integer
);


ALTER TABLE public.assistantlogentry OWNER TO postgres;

--
-- Name: assistantlogentry_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.assistantlogentry_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.assistantlogentry_id_seq OWNER TO postgres;

--
-- Name: assistantlogentry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.assistantlogentry_id_seq OWNED BY public.assistantlogentry.id;


--
-- Name: billexpenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.billexpenses (
    id integer NOT NULL,
    expenseid integer
);


ALTER TABLE public.billexpenses OWNER TO postgres;

--
-- Name: billexpenses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.billexpenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.billexpenses_id_seq OWNER TO postgres;

--
-- Name: billexpenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.billexpenses_id_seq OWNED BY public.billexpenses.id;


--
-- Name: dentalchart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dentalchart (
    id integer NOT NULL,
    patientid integer,
    dentistid integer,
    date date,
    note text
);


ALTER TABLE public.dentalchart OWNER TO postgres;

--
-- Name: dentalchart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dentalchart_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dentalchart_id_seq OWNER TO postgres;

--
-- Name: dentalchart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dentalchart_id_seq OWNED BY public.dentalchart.id;


--
-- Name: dentalcharthistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dentalcharthistory (
    id integer NOT NULL,
    patientid integer,
    dentalchartid integer,
    date date,
    notes text
);


ALTER TABLE public.dentalcharthistory OWNER TO postgres;

--
-- Name: dentalcharthistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dentalcharthistory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dentalcharthistory_id_seq OWNER TO postgres;

--
-- Name: dentalcharthistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dentalcharthistory_id_seq OWNED BY public.dentalcharthistory.id;


--
-- Name: dentalcharttooth; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dentalcharttooth (
    id integer NOT NULL,
    dentalchartid integer,
    teethnumber numeric(2,0),
    statusbits bit(3),
    laycrowntypebits bit(3),
    lay bit(5),
    recurringcarries bit(5),
    amalgam bit(5),
    composite bit(5),
    carries bit(5)
);


ALTER TABLE public.dentalcharttooth OWNER TO postgres;

--
-- Name: dentalcharttooth_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dentalcharttooth_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dentalcharttooth_id_seq OWNER TO postgres;

--
-- Name: dentalcharttooth_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dentalcharttooth_id_seq OWNED BY public.dentalcharttooth.id;


--
-- Name: dentistinformation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dentistinformation (
    id integer NOT NULL,
    namelast character varying(40),
    namefirst character varying(40),
    namemiddle character varying(40),
    email character varying(255),
    numbertelephone character varying(10),
    numbermobile character varying(10),
    numberprc character varying(7)
);


ALTER TABLE public.dentistinformation OWNER TO postgres;

--
-- Name: dentistinformation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dentistinformation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dentistinformation_id_seq OWNER TO postgres;

--
-- Name: dentistinformation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dentistinformation_id_seq OWNED BY public.dentistinformation.id;


--
-- Name: dentistlogentry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dentistlogentry (
    id integer NOT NULL,
    dentistid integer,
    logid integer
);


ALTER TABLE public.dentistlogentry OWNER TO postgres;

--
-- Name: dentistlogentry_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dentistlogentry_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dentistlogentry_id_seq OWNER TO postgres;

--
-- Name: dentistlogentry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dentistlogentry_id_seq OWNED BY public.dentistlogentry.id;


--
-- Name: directory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.directory (
    id integer NOT NULL,
    thirdpartyid integer
);


ALTER TABLE public.directory OWNER TO postgres;

--
-- Name: directory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.directory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.directory_id_seq OWNER TO postgres;

--
-- Name: directory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.directory_id_seq OWNED BY public.directory.id;


--
-- Name: downpaymentexpenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.downpaymentexpenses (
    id integer NOT NULL,
    expenseid integer
);


ALTER TABLE public.downpaymentexpenses OWNER TO postgres;

--
-- Name: downpaymentexpenses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.downpaymentexpenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.downpaymentexpenses_id_seq OWNER TO postgres;

--
-- Name: downpaymentexpenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.downpaymentexpenses_id_seq OWNED BY public.downpaymentexpenses.id;


--
-- Name: emergencyperson; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.emergencyperson (
    id integer NOT NULL,
    patientid integer,
    namelast character varying(40),
    namefirst character varying(40),
    numbertelephone character varying(10),
    numbermobile character varying(10)
);


ALTER TABLE public.emergencyperson OWNER TO postgres;

--
-- Name: emergencyperson_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.emergencyperson_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.emergencyperson_id_seq OWNER TO postgres;

--
-- Name: emergencyperson_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.emergencyperson_id_seq OWNED BY public.emergencyperson.id;


--
-- Name: equipmentexpenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.equipmentexpenses (
    id integer NOT NULL,
    expenseid integer
);


ALTER TABLE public.equipmentexpenses OWNER TO postgres;

--
-- Name: equipmentexpenses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.equipmentexpenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.equipmentexpenses_id_seq OWNER TO postgres;

--
-- Name: equipmentexpenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.equipmentexpenses_id_seq OWNED BY public.equipmentexpenses.id;


--
-- Name: expense; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expense (
    id integer NOT NULL,
    item character varying(40),
    quantity numeric,
    basecost numeric,
    expense numeric,
    isdeleted boolean DEFAULT false
);


ALTER TABLE public.expense OWNER TO postgres;

--
-- Name: expense_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.expense_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.expense_id_seq OWNER TO postgres;

--
-- Name: expense_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.expense_id_seq OWNED BY public.expense.id;


--
-- Name: form; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.form (
    id integer NOT NULL,
    patientid integer,
    dentistid integer,
    formtype character varying(40),
    date date,
    filepath character varying(255)
);


ALTER TABLE public.form OWNER TO postgres;

--
-- Name: form_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.form_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.form_id_seq OWNER TO postgres;

--
-- Name: form_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.form_id_seq OWNED BY public.form.id;


--
-- Name: image; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.image (
    id integer NOT NULL,
    patientid integer,
    imagetype text,
    creationdate date,
    filepath character varying(255)
);


ALTER TABLE public.image OWNER TO postgres;

--
-- Name: image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.image_id_seq OWNER TO postgres;

--
-- Name: image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.image_id_seq OWNED BY public.image.id;


--
-- Name: imagechronology; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.imagechronology (
    id integer NOT NULL,
    patientid integer,
    imageid integer,
    date date,
    notes text
);


ALTER TABLE public.imagechronology OWNER TO postgres;

--
-- Name: imagechronology_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.imagechronology_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.imagechronology_id_seq OWNER TO postgres;

--
-- Name: imagechronology_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.imagechronology_id_seq OWNED BY public.imagechronology.id;


--
-- Name: invoice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoice (
    id integer NOT NULL,
    patientid integer,
    total numeric
);


ALTER TABLE public.invoice OWNER TO postgres;

--
-- Name: invoice_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.invoice_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.invoice_id_seq OWNER TO postgres;

--
-- Name: invoice_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.invoice_id_seq OWNED BY public.invoice.id;


--
-- Name: log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.log (
    id integer NOT NULL,
    timein timestamp without time zone,
    timeout timestamp without time zone
);


ALTER TABLE public.log OWNER TO postgres;

--
-- Name: log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.log_id_seq OWNER TO postgres;

--
-- Name: log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.log_id_seq OWNED BY public.log.id;


--
-- Name: medicalhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medicalhistory (
    id integer NOT NULL,
    patientid integer,
    date date,
    filepath character varying(255)
);


ALTER TABLE public.medicalhistory OWNER TO postgres;

--
-- Name: medicalhistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medicalhistory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medicalhistory_id_seq OWNER TO postgres;

--
-- Name: medicalhistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medicalhistory_id_seq OWNED BY public.medicalhistory.id;


--
-- Name: medication; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.medication (
    id integer NOT NULL,
    prescriptionid integer,
    medicine character varying(40),
    quantity integer,
    signetur text
);


ALTER TABLE public.medication OWNER TO postgres;

--
-- Name: medication_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.medication_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medication_id_seq OWNER TO postgres;

--
-- Name: medication_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.medication_id_seq OWNED BY public.medication.id;


--
-- Name: otherexpenses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.otherexpenses (
    id integer NOT NULL,
    expenseid integer
);


ALTER TABLE public.otherexpenses OWNER TO postgres;

--
-- Name: otherexpenses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.otherexpenses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.otherexpenses_id_seq OWNER TO postgres;

--
-- Name: otherexpenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.otherexpenses_id_seq OWNED BY public.otherexpenses.id;


--
-- Name: parent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.parent (
    id integer NOT NULL,
    patientid integer,
    namelast character varying(40),
    namefirst character varying(40),
    numbertelephone character varying(10),
    numbermobile character varying(10)
);


ALTER TABLE public.parent OWNER TO postgres;

--
-- Name: parent_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.parent_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parent_id_seq OWNER TO postgres;

--
-- Name: parent_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.parent_id_seq OWNED BY public.parent.id;


--
-- Name: patientinformation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.patientinformation (
    id integer NOT NULL,
    namelast character varying(40),
    namefirst character varying(40),
    namemiddle character varying(40),
    dateofentry date,
    dateofbirth date,
    civilstatus character varying(40),
    patientaddress character varying(255),
    patientgender character varying(40),
    patientheight numeric,
    patientweight numeric,
    numbertelephone character varying(10),
    numbermobile character varying(10),
    email character varying(255),
    occupation character varying(255),
    password public.citext
);


ALTER TABLE public.patientinformation OWNER TO postgres;

--
-- Name: patientinformation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.patientinformation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.patientinformation_id_seq OWNER TO postgres;

--
-- Name: patientinformation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.patientinformation_id_seq OWNED BY public.patientinformation.id;


--
-- Name: prescription; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prescription (
    id integer NOT NULL,
    patientid integer,
    dentistid integer,
    date date
);


ALTER TABLE public.prescription OWNER TO postgres;

--
-- Name: prescription_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prescription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.prescription_id_seq OWNER TO postgres;

--
-- Name: prescription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prescription_id_seq OWNED BY public.prescription.id;


--
-- Name: prescriptionhistory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.prescriptionhistory (
    id integer NOT NULL,
    patientid integer,
    prescriptionid integer,
    date date
);


ALTER TABLE public.prescriptionhistory OWNER TO postgres;

--
-- Name: prescriptionhistory_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.prescriptionhistory_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.prescriptionhistory_id_seq OWNER TO postgres;

--
-- Name: prescriptionhistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.prescriptionhistory_id_seq OWNED BY public.prescriptionhistory.id;


--
-- Name: procedure; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.procedure (
    id integer NOT NULL,
    invoiceid integer,
    procedurename character varying(40),
    description text,
    cost numeric
);


ALTER TABLE public.procedure OWNER TO postgres;

--
-- Name: procedure_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.procedure_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.procedure_id_seq OWNER TO postgres;

--
-- Name: procedure_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.procedure_id_seq OWNED BY public.procedure.id;


--
-- Name: thirdpartyinformation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.thirdpartyinformation (
    id integer NOT NULL,
    thidpartyname character varying(255),
    affiliation character varying(255),
    email character varying(255),
    numbertelephone character varying(10),
    numbermobile character varying(10)
);


ALTER TABLE public.thirdpartyinformation OWNER TO postgres;

--
-- Name: thirdpartyinformation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.thirdpartyinformation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.thirdpartyinformation_id_seq OWNER TO postgres;

--
-- Name: thirdpartyinformation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.thirdpartyinformation_id_seq OWNED BY public.thirdpartyinformation.id;


--
-- Name: thirdpartylogentry; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.thirdpartylogentry (
    id integer NOT NULL,
    thirdpartyid integer,
    logid integer
);


ALTER TABLE public.thirdpartylogentry OWNER TO postgres;

--
-- Name: thirdpartylogentry_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.thirdpartylogentry_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.thirdpartylogentry_id_seq OWNER TO postgres;

--
-- Name: thirdpartylogentry_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.thirdpartylogentry_id_seq OWNED BY public.thirdpartylogentry.id;


--
-- Name: appointment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment ALTER COLUMN id SET DEFAULT nextval('public.appointment_id_seq'::regclass);


--
-- Name: appointmenthistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointmenthistory ALTER COLUMN id SET DEFAULT nextval('public.appointmenthistory_id_seq'::regclass);


--
-- Name: appointmentprocedure id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointmentprocedure ALTER COLUMN id SET DEFAULT nextval('public.appointmentprocedure_id_seq'::regclass);


--
-- Name: assistantinformation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistantinformation ALTER COLUMN id SET DEFAULT nextval('public.assistantinformation_id_seq'::regclass);


--
-- Name: assistantlogentry id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistantlogentry ALTER COLUMN id SET DEFAULT nextval('public.assistantlogentry_id_seq'::regclass);


--
-- Name: billexpenses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billexpenses ALTER COLUMN id SET DEFAULT nextval('public.billexpenses_id_seq'::regclass);


--
-- Name: dentalchart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentalchart ALTER COLUMN id SET DEFAULT nextval('public.dentalchart_id_seq'::regclass);


--
-- Name: dentalcharthistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentalcharthistory ALTER COLUMN id SET DEFAULT nextval('public.dentalcharthistory_id_seq'::regclass);


--
-- Name: dentalcharttooth id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentalcharttooth ALTER COLUMN id SET DEFAULT nextval('public.dentalcharttooth_id_seq'::regclass);


--
-- Name: dentistinformation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentistinformation ALTER COLUMN id SET DEFAULT nextval('public.dentistinformation_id_seq'::regclass);


--
-- Name: dentistlogentry id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentistlogentry ALTER COLUMN id SET DEFAULT nextval('public.dentistlogentry_id_seq'::regclass);


--
-- Name: directory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directory ALTER COLUMN id SET DEFAULT nextval('public.directory_id_seq'::regclass);


--
-- Name: downpaymentexpenses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.downpaymentexpenses ALTER COLUMN id SET DEFAULT nextval('public.downpaymentexpenses_id_seq'::regclass);


--
-- Name: emergencyperson id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emergencyperson ALTER COLUMN id SET DEFAULT nextval('public.emergencyperson_id_seq'::regclass);


--
-- Name: equipmentexpenses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipmentexpenses ALTER COLUMN id SET DEFAULT nextval('public.equipmentexpenses_id_seq'::regclass);


--
-- Name: expense id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense ALTER COLUMN id SET DEFAULT nextval('public.expense_id_seq'::regclass);


--
-- Name: form id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form ALTER COLUMN id SET DEFAULT nextval('public.form_id_seq'::regclass);


--
-- Name: image id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image ALTER COLUMN id SET DEFAULT nextval('public.image_id_seq'::regclass);


--
-- Name: imagechronology id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagechronology ALTER COLUMN id SET DEFAULT nextval('public.imagechronology_id_seq'::regclass);


--
-- Name: invoice id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice ALTER COLUMN id SET DEFAULT nextval('public.invoice_id_seq'::regclass);


--
-- Name: log id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.log ALTER COLUMN id SET DEFAULT nextval('public.log_id_seq'::regclass);


--
-- Name: medicalhistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicalhistory ALTER COLUMN id SET DEFAULT nextval('public.medicalhistory_id_seq'::regclass);


--
-- Name: medication id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medication ALTER COLUMN id SET DEFAULT nextval('public.medication_id_seq'::regclass);


--
-- Name: otherexpenses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otherexpenses ALTER COLUMN id SET DEFAULT nextval('public.otherexpenses_id_seq'::regclass);


--
-- Name: parent id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent ALTER COLUMN id SET DEFAULT nextval('public.parent_id_seq'::regclass);


--
-- Name: patientinformation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patientinformation ALTER COLUMN id SET DEFAULT nextval('public.patientinformation_id_seq'::regclass);


--
-- Name: prescription id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescription ALTER COLUMN id SET DEFAULT nextval('public.prescription_id_seq'::regclass);


--
-- Name: prescriptionhistory id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescriptionhistory ALTER COLUMN id SET DEFAULT nextval('public.prescriptionhistory_id_seq'::regclass);


--
-- Name: procedure id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.procedure ALTER COLUMN id SET DEFAULT nextval('public.procedure_id_seq'::regclass);


--
-- Name: thirdpartyinformation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thirdpartyinformation ALTER COLUMN id SET DEFAULT nextval('public.thirdpartyinformation_id_seq'::regclass);


--
-- Name: thirdpartylogentry id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thirdpartylogentry ALTER COLUMN id SET DEFAULT nextval('public.thirdpartylogentry_id_seq'::regclass);


--
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointment (id, patientid, dentistid, appointmentdate, timestart, timeend) FROM stdin;
\.


--
-- Data for Name: appointmenthistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointmenthistory (id, patientid, appointmentid, status) FROM stdin;
\.


--
-- Data for Name: appointmentprocedure; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointmentprocedure (id, appointmentid, procedure, notes) FROM stdin;
\.


--
-- Data for Name: assistantinformation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assistantinformation (id, namelast, namefirst, namemiddle, email, numbermobile) FROM stdin;
\.


--
-- Data for Name: assistantlogentry; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.assistantlogentry (id, assistantid, logid) FROM stdin;
\.


--
-- Data for Name: billexpenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.billexpenses (id, expenseid) FROM stdin;
\.


--
-- Data for Name: dentalchart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dentalchart (id, patientid, dentistid, date, note) FROM stdin;
10	1	1	2023-11-18	is healthy
\.


--
-- Data for Name: dentalcharthistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dentalcharthistory (id, patientid, dentalchartid, date, notes) FROM stdin;
\.


--
-- Data for Name: dentalcharttooth; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dentalcharttooth (id, dentalchartid, teethnumber, statusbits, laycrowntypebits, lay, recurringcarries, amalgam, composite, carries) FROM stdin;
64	10	11	000	000	00000	00000	00000	00000	00000
65	10	23	000	000	00000	00000	00000	00000	00000
66	10	24	000	000	00000	00000	00000	00000	00000
67	10	25	000	000	00000	00000	00000	00000	00000
68	10	26	000	000	00000	00000	00000	00000	00000
69	10	27	000	000	00000	00000	00000	00000	00000
70	10	28	000	000	00000	00000	00000	00000	00000
71	10	31	000	000	00000	00000	00000	00000	00000
72	10	32	000	000	00000	00000	00000	00000	00000
73	10	33	000	000	00000	00000	00000	00000	00000
74	10	34	000	000	00000	00000	00000	00000	00000
75	10	35	000	000	00000	00000	00000	00000	00000
76	10	36	000	000	00000	00000	00000	00000	00000
77	10	37	000	000	00000	00000	00000	00000	00000
78	10	38	000	000	00000	00000	00000	00000	00000
79	10	41	000	000	00000	00000	00000	00000	00000
80	10	42	000	000	00000	00000	00000	00000	00000
81	10	43	000	000	00000	00000	00000	00000	00000
82	10	44	000	000	00000	00000	00000	00000	00000
83	10	45	000	000	00000	00000	00000	00000	00000
84	10	46	000	000	00000	00000	00000	00000	00000
85	10	47	000	000	00000	00000	00000	00000	00000
86	10	48	000	000	00000	00000	00000	00000	00000
87	10	14	000	000	00000	00000	00000	00000	00000
88	10	13	000	000	00000	00000	00000	00000	00000
89	10	12	000	000	00000	00000	00000	00000	00000
90	10	16	000	000	00000	00000	00000	00000	00000
91	10	22	000	000	00000	00000	00000	00000	00000
92	10	15	000	000	00000	00000	00000	00000	00000
93	10	18	000	000	00000	00000	00000	00000	00000
94	10	17	000	000	00000	00000	00000	00000	00000
95	10	21	000	000	00000	00000	00000	00000	00000
\.


--
-- Data for Name: dentistinformation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dentistinformation (id, namelast, namefirst, namemiddle, email, numbertelephone, numbermobile, numberprc) FROM stdin;
1	Gomez	Maria	Cruz	maria.gomez@example.com	1234567890	9876543210	7654321
\.


--
-- Data for Name: dentistlogentry; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dentistlogentry (id, dentistid, logid) FROM stdin;
\.


--
-- Data for Name: directory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.directory (id, thirdpartyid) FROM stdin;
\.


--
-- Data for Name: downpaymentexpenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.downpaymentexpenses (id, expenseid) FROM stdin;
\.


--
-- Data for Name: emergencyperson; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.emergencyperson (id, patientid, namelast, namefirst, numbertelephone, numbermobile) FROM stdin;
\.


--
-- Data for Name: equipmentexpenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.equipmentexpenses (id, expenseid) FROM stdin;
\.


--
-- Data for Name: expense; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expense (id, item, quantity, basecost, expense, isdeleted) FROM stdin;
\.


--
-- Data for Name: form; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.form (id, patientid, dentistid, formtype, date, filepath) FROM stdin;
\.


--
-- Data for Name: image; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.image (id, patientid, imagetype, creationdate, filepath) FROM stdin;
\.


--
-- Data for Name: imagechronology; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.imagechronology (id, patientid, imageid, date, notes) FROM stdin;
\.


--
-- Data for Name: invoice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invoice (id, patientid, total) FROM stdin;
\.


--
-- Data for Name: log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.log (id, timein, timeout) FROM stdin;
\.


--
-- Data for Name: medicalhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.medicalhistory (id, patientid, date, filepath) FROM stdin;
\.


--
-- Data for Name: medication; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.medication (id, prescriptionid, medicine, quantity, signetur) FROM stdin;
\.


--
-- Data for Name: otherexpenses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.otherexpenses (id, expenseid) FROM stdin;
\.


--
-- Data for Name: parent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.parent (id, patientid, namelast, namefirst, numbertelephone, numbermobile) FROM stdin;
\.


--
-- Data for Name: patientinformation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patientinformation (id, namelast, namefirst, namemiddle, dateofentry, dateofbirth, civilstatus, patientaddress, patientgender, patientheight, patientweight, numbertelephone, numbermobile, email, occupation, password) FROM stdin;
1	Dela Cruz	Juan	Santos	2023-11-18	1985-03-15	Married	123 Main Street, Cebu City	Male	175	70	1234567890	9876543210	juan.delacruz@example.com	Engineer	securepassword123
2	Garcia	Maria	Luz	2023-11-18	1990-07-20	Single	456 Oak Avenue, Cebu City	Female	160	55	2345678901	8765432109	maria.garcia@example.com	Teacher	strongpassword456
3	Lopez	Carlos	Miguel	2023-11-18	1978-12-10	Divorced	789 Pine Street, Cebu City	Male	180	85	3456789012	7654321098	carlos.lopez@example.com	Accountant	securepass789
4	Torres	Ana	Isabel	2023-11-18	1982-05-25	Widowed	101 Cedar Lane, Cebu City	Female	165	60	4567890123	6543210987	ana.torres@example.com	Nurse	safeandstrong789
5	Ramos	Jose	Antonio	2023-11-18	1989-09-08	Married	202 Elm Street, Cebu City	Male	170	75	5678901234	5432109876	jose.ramos@example.com	IT Specialist	password123abc
\.


--
-- Data for Name: prescription; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.prescription (id, patientid, dentistid, date) FROM stdin;
\.


--
-- Data for Name: prescriptionhistory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.prescriptionhistory (id, patientid, prescriptionid, date) FROM stdin;
\.


--
-- Data for Name: procedure; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.procedure (id, invoiceid, procedurename, description, cost) FROM stdin;
\.


--
-- Data for Name: thirdpartyinformation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.thirdpartyinformation (id, thidpartyname, affiliation, email, numbertelephone, numbermobile) FROM stdin;
\.


--
-- Data for Name: thirdpartylogentry; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.thirdpartylogentry (id, thirdpartyid, logid) FROM stdin;
\.


--
-- Name: appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointment_id_seq', 1, false);


--
-- Name: appointmenthistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointmenthistory_id_seq', 1, false);


--
-- Name: appointmentprocedure_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointmentprocedure_id_seq', 1, false);


--
-- Name: assistantinformation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assistantinformation_id_seq', 1, false);


--
-- Name: assistantlogentry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.assistantlogentry_id_seq', 1, false);


--
-- Name: billexpenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.billexpenses_id_seq', 1, false);


--
-- Name: dentalchart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dentalchart_id_seq', 10, true);


--
-- Name: dentalcharthistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dentalcharthistory_id_seq', 1, false);


--
-- Name: dentalcharttooth_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dentalcharttooth_id_seq', 95, true);


--
-- Name: dentistinformation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dentistinformation_id_seq', 1, true);


--
-- Name: dentistlogentry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dentistlogentry_id_seq', 1, false);


--
-- Name: directory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.directory_id_seq', 1, false);


--
-- Name: downpaymentexpenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.downpaymentexpenses_id_seq', 1, false);


--
-- Name: emergencyperson_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.emergencyperson_id_seq', 1, false);


--
-- Name: equipmentexpenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.equipmentexpenses_id_seq', 1, false);


--
-- Name: expense_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.expense_id_seq', 1, false);


--
-- Name: form_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.form_id_seq', 1, false);


--
-- Name: image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.image_id_seq', 1, false);


--
-- Name: imagechronology_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.imagechronology_id_seq', 1, false);


--
-- Name: invoice_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.invoice_id_seq', 1, false);


--
-- Name: log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.log_id_seq', 1, false);


--
-- Name: medicalhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medicalhistory_id_seq', 1, false);


--
-- Name: medication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medication_id_seq', 1, false);


--
-- Name: otherexpenses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.otherexpenses_id_seq', 1, false);


--
-- Name: parent_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.parent_id_seq', 1, false);


--
-- Name: patientinformation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patientinformation_id_seq', 5, true);


--
-- Name: prescription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.prescription_id_seq', 1, false);


--
-- Name: prescriptionhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.prescriptionhistory_id_seq', 1, false);


--
-- Name: procedure_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.procedure_id_seq', 1, false);


--
-- Name: thirdpartyinformation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.thirdpartyinformation_id_seq', 1, false);


--
-- Name: thirdpartylogentry_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.thirdpartylogentry_id_seq', 1, false);


--
-- Name: appointment appointment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT appointment_pkey PRIMARY KEY (id);


--
-- Name: appointmenthistory appointmenthistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointmenthistory
    ADD CONSTRAINT appointmenthistory_pkey PRIMARY KEY (id);


--
-- Name: appointmentprocedure appointmentprocedure_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointmentprocedure
    ADD CONSTRAINT appointmentprocedure_pkey PRIMARY KEY (id);


--
-- Name: assistantinformation assistantinformation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistantinformation
    ADD CONSTRAINT assistantinformation_pkey PRIMARY KEY (id);


--
-- Name: assistantlogentry assistantlogentry_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistantlogentry
    ADD CONSTRAINT assistantlogentry_pkey PRIMARY KEY (id);


--
-- Name: billexpenses billexpenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billexpenses
    ADD CONSTRAINT billexpenses_pkey PRIMARY KEY (id);


--
-- Name: dentalchart dentalchart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentalchart
    ADD CONSTRAINT dentalchart_pkey PRIMARY KEY (id);


--
-- Name: dentalcharthistory dentalcharthistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentalcharthistory
    ADD CONSTRAINT dentalcharthistory_pkey PRIMARY KEY (id);


--
-- Name: dentalcharttooth dentalcharttooth_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentalcharttooth
    ADD CONSTRAINT dentalcharttooth_pkey PRIMARY KEY (id);


--
-- Name: dentistinformation dentistinformation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentistinformation
    ADD CONSTRAINT dentistinformation_pkey PRIMARY KEY (id);


--
-- Name: dentistlogentry dentistlogentry_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentistlogentry
    ADD CONSTRAINT dentistlogentry_pkey PRIMARY KEY (id);


--
-- Name: directory directory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directory
    ADD CONSTRAINT directory_pkey PRIMARY KEY (id);


--
-- Name: downpaymentexpenses downpaymentexpenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.downpaymentexpenses
    ADD CONSTRAINT downpaymentexpenses_pkey PRIMARY KEY (id);


--
-- Name: emergencyperson emergencyperson_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emergencyperson
    ADD CONSTRAINT emergencyperson_pkey PRIMARY KEY (id);


--
-- Name: equipmentexpenses equipmentexpenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipmentexpenses
    ADD CONSTRAINT equipmentexpenses_pkey PRIMARY KEY (id);


--
-- Name: expense expense_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_pkey PRIMARY KEY (id);


--
-- Name: form form_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form
    ADD CONSTRAINT form_pkey PRIMARY KEY (id);


--
-- Name: image image_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT image_pkey PRIMARY KEY (id);


--
-- Name: imagechronology imagechronology_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagechronology
    ADD CONSTRAINT imagechronology_pkey PRIMARY KEY (id);


--
-- Name: invoice invoice_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT invoice_pkey PRIMARY KEY (id);


--
-- Name: log log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.log
    ADD CONSTRAINT log_pkey PRIMARY KEY (id);


--
-- Name: medicalhistory medicalhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicalhistory
    ADD CONSTRAINT medicalhistory_pkey PRIMARY KEY (id);


--
-- Name: medication medication_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medication
    ADD CONSTRAINT medication_pkey PRIMARY KEY (id);


--
-- Name: otherexpenses otherexpenses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otherexpenses
    ADD CONSTRAINT otherexpenses_pkey PRIMARY KEY (id);


--
-- Name: parent parent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent
    ADD CONSTRAINT parent_pkey PRIMARY KEY (id);


--
-- Name: patientinformation patientinformation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patientinformation
    ADD CONSTRAINT patientinformation_pkey PRIMARY KEY (id);


--
-- Name: prescription prescription_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescription
    ADD CONSTRAINT prescription_pkey PRIMARY KEY (id);


--
-- Name: prescriptionhistory prescriptionhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescriptionhistory
    ADD CONSTRAINT prescriptionhistory_pkey PRIMARY KEY (id);


--
-- Name: procedure procedure_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.procedure
    ADD CONSTRAINT procedure_pkey PRIMARY KEY (id);


--
-- Name: thirdpartyinformation thirdpartyinformation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thirdpartyinformation
    ADD CONSTRAINT thirdpartyinformation_pkey PRIMARY KEY (id);


--
-- Name: thirdpartylogentry thirdpartylogentry_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thirdpartylogentry
    ADD CONSTRAINT thirdpartylogentry_pkey PRIMARY KEY (id);


--
-- Name: appointmentprocedure fk_appointment; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointmentprocedure
    ADD CONSTRAINT fk_appointment FOREIGN KEY (appointmentid) REFERENCES public.appointment(id) ON DELETE CASCADE;


--
-- Name: appointmenthistory fk_appointment; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointmenthistory
    ADD CONSTRAINT fk_appointment FOREIGN KEY (appointmentid) REFERENCES public.appointment(id) ON DELETE CASCADE;


--
-- Name: assistantlogentry fk_assistant; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistantlogentry
    ADD CONSTRAINT fk_assistant FOREIGN KEY (assistantid) REFERENCES public.assistantinformation(id) ON DELETE CASCADE;


--
-- Name: dentalcharttooth fk_dentalchart; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentalcharttooth
    ADD CONSTRAINT fk_dentalchart FOREIGN KEY (dentalchartid) REFERENCES public.dentalchart(id) ON DELETE CASCADE;


--
-- Name: dentalcharthistory fk_dentalchart; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentalcharthistory
    ADD CONSTRAINT fk_dentalchart FOREIGN KEY (dentalchartid) REFERENCES public.dentalchart(id) ON DELETE CASCADE;


--
-- Name: dentistlogentry fk_dentist; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentistlogentry
    ADD CONSTRAINT fk_dentist FOREIGN KEY (dentistid) REFERENCES public.dentistinformation(id) ON DELETE CASCADE;


--
-- Name: appointment fk_dentist; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT fk_dentist FOREIGN KEY (dentistid) REFERENCES public.dentistinformation(id) ON DELETE CASCADE;


--
-- Name: dentalchart fk_dentist; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentalchart
    ADD CONSTRAINT fk_dentist FOREIGN KEY (dentistid) REFERENCES public.dentistinformation(id) ON DELETE CASCADE;


--
-- Name: form fk_dentist; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form
    ADD CONSTRAINT fk_dentist FOREIGN KEY (dentistid) REFERENCES public.dentistinformation(id) ON DELETE CASCADE;


--
-- Name: prescription fk_dentist; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescription
    ADD CONSTRAINT fk_dentist FOREIGN KEY (dentistid) REFERENCES public.dentistinformation(id) ON DELETE CASCADE;


--
-- Name: downpaymentexpenses fk_expense; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.downpaymentexpenses
    ADD CONSTRAINT fk_expense FOREIGN KEY (expenseid) REFERENCES public.expense(id);


--
-- Name: billexpenses fk_expense; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.billexpenses
    ADD CONSTRAINT fk_expense FOREIGN KEY (expenseid) REFERENCES public.expense(id);


--
-- Name: equipmentexpenses fk_expense; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.equipmentexpenses
    ADD CONSTRAINT fk_expense FOREIGN KEY (expenseid) REFERENCES public.expense(id);


--
-- Name: otherexpenses fk_expense; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.otherexpenses
    ADD CONSTRAINT fk_expense FOREIGN KEY (expenseid) REFERENCES public.expense(id);


--
-- Name: imagechronology fk_image; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagechronology
    ADD CONSTRAINT fk_image FOREIGN KEY (imageid) REFERENCES public.image(id) ON DELETE CASCADE;


--
-- Name: procedure fk_invoice; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.procedure
    ADD CONSTRAINT fk_invoice FOREIGN KEY (invoiceid) REFERENCES public.invoice(id);


--
-- Name: dentistlogentry fk_log; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentistlogentry
    ADD CONSTRAINT fk_log FOREIGN KEY (logid) REFERENCES public.log(id) ON DELETE CASCADE;


--
-- Name: assistantlogentry fk_log; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.assistantlogentry
    ADD CONSTRAINT fk_log FOREIGN KEY (logid) REFERENCES public.log(id) ON DELETE CASCADE;


--
-- Name: thirdpartylogentry fk_log; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thirdpartylogentry
    ADD CONSTRAINT fk_log FOREIGN KEY (logid) REFERENCES public.log(id) ON DELETE CASCADE;


--
-- Name: emergencyperson fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.emergencyperson
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientid) REFERENCES public.patientinformation(id) ON DELETE CASCADE;


--
-- Name: parent fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.parent
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientid) REFERENCES public.patientinformation(id) ON DELETE CASCADE;


--
-- Name: appointment fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientid) REFERENCES public.patientinformation(id) ON DELETE CASCADE;


--
-- Name: appointmenthistory fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointmenthistory
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientid) REFERENCES public.patientinformation(id) ON DELETE CASCADE;


--
-- Name: image fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.image
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientid) REFERENCES public.patientinformation(id) ON DELETE CASCADE;


--
-- Name: imagechronology fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.imagechronology
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientid) REFERENCES public.patientinformation(id) ON DELETE CASCADE;


--
-- Name: dentalchart fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentalchart
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientid) REFERENCES public.patientinformation(id) ON DELETE CASCADE;


--
-- Name: dentalcharthistory fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dentalcharthistory
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientid) REFERENCES public.patientinformation(id) ON DELETE CASCADE;


--
-- Name: medicalhistory fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicalhistory
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientid) REFERENCES public.patientinformation(id) ON DELETE CASCADE;


--
-- Name: form fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.form
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientid) REFERENCES public.patientinformation(id) ON DELETE CASCADE;


--
-- Name: prescription fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescription
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientid) REFERENCES public.patientinformation(id) ON DELETE CASCADE;


--
-- Name: prescriptionhistory fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescriptionhistory
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientid) REFERENCES public.patientinformation(id) ON DELETE CASCADE;


--
-- Name: invoice fk_patient; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT fk_patient FOREIGN KEY (patientid) REFERENCES public.patientinformation(id);


--
-- Name: medication fk_prescription; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medication
    ADD CONSTRAINT fk_prescription FOREIGN KEY (prescriptionid) REFERENCES public.prescription(id) ON DELETE CASCADE;


--
-- Name: prescriptionhistory fk_prescription; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.prescriptionhistory
    ADD CONSTRAINT fk_prescription FOREIGN KEY (prescriptionid) REFERENCES public.prescription(id) ON DELETE CASCADE;


--
-- Name: directory fk_thirdparty; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.directory
    ADD CONSTRAINT fk_thirdparty FOREIGN KEY (thirdpartyid) REFERENCES public.thirdpartyinformation(id) ON DELETE CASCADE;


--
-- Name: thirdpartylogentry fk_thirdparty; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.thirdpartylogentry
    ADD CONSTRAINT fk_thirdparty FOREIGN KEY (thirdpartyid) REFERENCES public.thirdpartyinformation(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

