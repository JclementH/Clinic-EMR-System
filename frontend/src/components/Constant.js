// Teeth Color Constants
export const TEETH_GRAY = "#bfbfbf"
export const TEETH_RED = "#f9425a";
export const TEETH_GREEN = "#42f548";
export const TEETH_BLUE = "#4287f5";
export const TEETH_YELLOW = "#f5bc42";

// TeethImage Constants
export const CHANGE_TOP = "change-top";
export const CHANGE_BOT = "change-bot";
export const CHANGE_LEFT = "change-left";
export const CHANGE_RIGHT = "change-right";
export const CHANGE_MID = "change-mid";

//DocumentPage Constants
export const CERTFICATE_SELECT = "certificates";
export const WORK_SELECT = "work";
export const DOSAGE_SELECT = "dosage";
export const RTX_SELECT = "rtx";
export const CONSENT_SELECT = "consent";

export const db = [
    {id: 0, name: "Lights?", cost: "20"},
]

//ExpensePage Constants
export const CHANGE_NAME = "change-name"
export const CHANGE_EXPENSE = "change-expense"
export const IS_PAID = "is-paid"
export const CHANGE_QUANTITY= "change-quantity"
export const CHANGE_CPU = "change-cpu"
export const PUSH_DATA = "push-data" 
export const CHANGE_TOTAL = "change-total"
export const CLEAR_DATA = "clear-data"
export const SET_PAID = "set-paid"
export const SET_EDIT = "set-edit"
export const EDIT_DATA = "edit-data"
export const SET_ID = "set-id"
export const DELETE_ID = "delete-id"
export const SET_ROW = "set-row"
export const EXPENSE_SELECT = "select-expense"
export const BILLS_SELECT = "bills-expense"

//PedoDosage constants
export const FIFTEEN = 15
export const TWENTY = 20
export const FIFTY = 50
export const ONETWOFIVE = 125
export const TWOFIFTY = 250
export const FIVEZEROZERO = 500

//BillsPage Constants
export const SET_NAME = "set-name"
export const AMOUNT_DUE = "amount-due"
export const AMOUNT_AFTER_DUE = "amount-after-due"
export const DUE_DATE = "due-date"
export const DATE_PAID = "date-paid"
export const AMOUNT_PAID = "amount-paid"
export const CLEAR_ERROR = "clear-error"
export const DELETE_DATA = "delete-data"

//CertificateText Constants
export const MR = "Mr."
export const MS = "Ms."
export const MRS = "Mrs."
export const MALE = "Male"
export const FEMALE = "Female"

//Consent Constants
export const INFORMED_CONSENT = "informed-consent"

//Work Auth Constants
export const CROWN = "crown"

//App Constants
export const SWAP_HOME = "change-tab"
export const SWAP_DOC = "change-doc"
export const SWAP_INV = "change-inv"
export const SWAP_REC = "change-rec"
export const SWAP_ACC = "change-acc"
export const SWAP_NULL = "change-null"
export const CHANGE_PATIENT = 'change-patient'
export const LOGIN = "login"

//Mobile Checker
export const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);