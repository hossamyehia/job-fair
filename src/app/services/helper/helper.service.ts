import { Injectable } from '@angular/core';
import { ICustomer, ICustomerMap, ITotalAmount, ITransaction } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getTotalTransactionsAmount(transactions: ITransaction[]): ITotalAmount{
    return transactions.reduce((cummulative, curr, index)=>{
      cummulative = {
        ...cummulative,
        [curr.customer_id]: cummulative[curr.customer_id] ? cummulative[curr.customer_id] + curr.amount : curr.amount,
      }
      return cummulative;
    }, {} as ITotalAmount)
  }

  mapCustomersIdName(customers: ICustomer[]): ICustomerMap{
    return customers.reduce((cummulative, curr, index)=>{
      cummulative = {
        ...cummulative,
        [curr.id]: curr.name,
      }
      return cummulative;
    }, {} as ICustomerMap)
  }
  
  addCustomerName(customer_map: ICustomerMap, totalAmounts: ITotalAmount){
    return (Object.entries(totalAmounts) as Array<ICustomer["id"] | ITransaction["amount"]>[]).map(([key,value])=>{
      return {
        customer_id: key,
        name: customer_map[key],
        amount: value,
      }
    })
  }
}
