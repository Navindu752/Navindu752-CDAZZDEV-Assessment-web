// regex validation
const EMAIL_REGEX_VALIDATION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_VALIDATION = /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}).*$/

const EMAIL_PLACEHOLDER = "Enter mail here";
const EMAIL_REQUIRED = "Email is required!";
const PASSWORD_REQUIRED = "Password is required!";
const PASSWORD_PLACEHOLDER = "**************";
const USER_NAME_PLACEHOLDER = "Enter user name here";
const USER_NAME_REQUIRED = "User name is required!";
const PASSWORD_INVALID = "Password must include one uppercase letter, one lowercase letter, one number, and be at least 8 characters long!"
const PASSWORD_MOST_BE_EIGHT_CHARACTERS = "Password must be at least 8 characters!"
const CONFIRM_PASSWORD_REQUIRED = "Confirm password is required!";
const CONFIRM_NEW_PASSWORD_REQUIRED = "Confirm new password is required!";
const CONFIRM_PASSWORD_NOT_MATCHED = "Passwords must match!";
const CONFIRM_NEW_PASSWORD_NOT_MATCHED = "New password and confirm new password must match!";
const EMAIL_INVALID = "Email is invalid!";

//color codes
const SECONDARY_BLUE = '#37C0CA';
const WHITE = '#FFFFFF';

const MUI_PRIMARY = '#F1688F';
const MUI_SECONDARY = '#6c757d';
const MUI_ERROR = '#DC3545';
const MUI_WARNING = '#FFC107';
const MUI_INFO = '#0DCAF0';
const MUI_SUCCESS = '#198754';

module.exports = {
    USER_NAME_REQUIRED,
    EMAIL_REGEX_VALIDATION,
    PASSWORD_VALIDATION,
    EMAIL_PLACEHOLDER,
    EMAIL_REQUIRED,
    PASSWORD_REQUIRED,
    PASSWORD_PLACEHOLDER,
    USER_NAME_PLACEHOLDER,
    PASSWORD_INVALID,
    PASSWORD_MOST_BE_EIGHT_CHARACTERS,
    CONFIRM_PASSWORD_REQUIRED,
    CONFIRM_NEW_PASSWORD_REQUIRED,
    CONFIRM_PASSWORD_NOT_MATCHED,
    CONFIRM_NEW_PASSWORD_NOT_MATCHED,
    EMAIL_INVALID,
    SECONDARY_BLUE,
    WHITE,
    MUI_PRIMARY,
    MUI_SECONDARY,
    MUI_ERROR,
    MUI_WARNING,
    MUI_INFO,
    MUI_SUCCESS,
}
