import { ICustomer } from "./ICustomer.model";
import { ITransaction } from "./ITransaction.model";

export interface ITotalAmount{
    [key: ICustomer["id"]]: ITransaction["amount"];
}