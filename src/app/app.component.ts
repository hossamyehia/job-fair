import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartModule } from 'primeng/chart';
import { IChartData, ICustomer, IDisplayedData, ITransaction } from './models';
import { ApiService } from './services/api/api.service';
import { CommonModule } from '@angular/common';
import { HelperService } from './services/helper/helper.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChartModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'job-fair';

  chartData:IChartData = {
    labels: [],
    datasets: []
  }

  chartOptions: any = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  transactions: ITransaction[] = [];
  customers: ICustomer[] = [];
  data: IDisplayedData[] = [];
  displayedData: IDisplayedData[] = [];

  constructor(private _api: ApiService, private _helper: HelperService){}

  ngOnInit(): void {
      this.getData();
  }

  getData(){
    this.getTransactions();
  }

  getTransactions(){
    this._api.getTransactions().subscribe((value)=>{
      this.transactions = value;
      this.getCustomers();
      
    })
  }

  getCustomers(){
    this._api.getCustomers().subscribe((value)=>{
      this.customers = value;
      this.setData();
    })
  }

  setData(){
    const groupT = this._helper.getTotalTransactionsAmount(this.transactions);
    const groupC = this._helper.mapCustomersIdName(this.customers);
    this.data = this._helper.addCustomerName(groupC, groupT);
    this.setDisplayedData();
  }
  
  setDisplayedData(name?: string){
    this.displayedData = name ? this.data.filter((val)=>val.name.includes(name)) : this.data.slice();
  }

  onView(customer_id: ICustomer["id"], customer_name: ICustomer["name"]){
    this._api.getTransactionsForCustomer(customer_id).subscribe((value)=>{
      this.updateChartData(customer_name, value.map((val)=>val.date), value.map((val)=>val.amount))
    })
  }

  updateChartData(label: IChartData["datasets"][0]["label"], labels: IChartData["labels"], data: IChartData["datasets"][0]["data"]){
    this.chartData = {
      labels,
      datasets: [{
        label,
        data,
        barThickness: 50,
      }]
    }
  }

}
