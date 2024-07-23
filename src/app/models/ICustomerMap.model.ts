import { ICustomer } from "./ICustomer.model";

export interface ICustomerMap{
    [key: ICustomer["id"]]: ICustomer["name"];
}