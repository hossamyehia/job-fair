import { ICustomer } from "./ICustomer.model";
import { ITransaction } from "./ITransaction.model";

export interface IDisplayedData {
    customer_id: ICustomer["id"],
    name: ICustomer["name"],
    amount: ITransaction["amount"],
}