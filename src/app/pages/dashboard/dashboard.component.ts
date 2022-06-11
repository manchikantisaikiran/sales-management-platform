import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Order } from 'src/app/types/interface';

declare let Plotly: any;

interface CustomerVisitMappings {
  [key: string]: number
}

interface AllCustomerMappings {
  [key: string]: boolean
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  orders: Order[] | null = [];
  totalOrdersCount = 0;
  allCustomers: Order[] | undefined = [];
  allCustomersMappings: AllCustomerMappings = {};
  customerVisitMappings: CustomerVisitMappings = {};

  constructor(private localStrorageService: LocalStorageService) {
    this.orders = this.localStrorageService.readLocalStorage('orders');

    this.allCustomers = this.orders?.filter(order => {
      const date = order.order_date;
      if (!this.customerVisitMappings[date]) {
        this.customerVisitMappings[date] = 1;
      } else {
        this.customerVisitMappings[date]++;
      }

      if (!this.allCustomersMappings[order.customer.email]) {
        this.allCustomersMappings[order.customer.email] = true;
        return order.customer;
      } else {
        return false;
      }
    })
    this.totalOrdersCount = Object.keys(this.customerVisitMappings).length;
    
  }

  fetchOrders() {
    this.generateCustomerRatingsChart();
    this.generateCustomerVisitsCharts();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.fetchOrders();
  }

  //this is dummy data
  generateCustomerRatingsChart() {
    const data = [{
      type: "pie",
      values: [30, 40, 40, 200, 160],
      labels: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"],
      textinfo: "label+percent",
      textposition: "outside",
      automargin: true
    }]

    Plotly.newPlot('customer__ratings__chart', data)
  }

  generateCustomerVisitsCharts() {

    let xValue = Object.keys(this.customerVisitMappings);
    let yValue = Object.values(this.customerVisitMappings);

    var trace1 = {
      x: xValue,
      y: yValue,
      type: 'bar',
    };

    var data = [trace1];

    Plotly.newPlot('new__customer__visits__chart', data);

  }

}
