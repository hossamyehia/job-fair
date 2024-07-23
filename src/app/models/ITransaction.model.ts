import { ICustomer } from "./ICustomer.model";

export interface ITransaction{
    id: number,
    date: string,
    amount: number,
    customer_id: ICustomer["id"]
}