export type CountryCode = "MX" | "US" | "CH" | "JP";
export type Currency = "MXN" | "USD" | "CHF" | "JPY";

//interfaces it's a contract and all the points needs to be fufilled, if not the code will not compile
// to amek a value optional the "?" symbol is used, this way the code will compile even if the value is not provided
//This will help to create arrays in Typescript, for example: const users: User[] = []  --- This is an array of objects
// that needs to fufill the contract of the User interface

export interface User{
    username: string;
    password: string;
    description?: string;
}

export interface Market {
    code: CountryCode,
    currency: Currency,
    fullName: string,
    phone: string,
    address: string,
    colonia: string,
    zipCode: string,
    taxRate?: number
}