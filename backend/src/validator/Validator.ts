export const emailValidator = (value: string) => {
    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value);
}

export const phoneNumberValidator = (value: string) => {
    return /d{10}$|^\d{10}$/.test(value)
}