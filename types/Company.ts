import { Country } from "./Country";

export enum CompanySize {
    S_1 = "Employees 1 - 9",
    S_10 = "Employees 10 - 49",
    S_50 = "Employees 50 - 99",
    S_100 = "Employees 100 - 499",
    S_500 = "Employees or more 500"
}

export interface Company {
    companyName: string;
    id: string;
    workEmail: string;
    country: Country;
    phoneNumber: string;
    companySize: CompanySize
}
