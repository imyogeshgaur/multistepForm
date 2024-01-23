export const emailValidator = (value: string) => {
    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
}

export const phoneNumberValidator = (value: string) => {
    return /d{10}$|^\d{10}$/.test(value)
}

export const passwordValidator = (value: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}[\]:;<>,.?/~]).{8,}$/.test(value);
}

export const pinCodeValidator = (value: string) => {
    return /d{6}$|^\d{6}$/.test(value)
}