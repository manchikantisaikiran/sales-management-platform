import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaveOrdersComponent } from '../../modals/save-orders/save-orders.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { OrderStatusEnum } from '../../types/enum';
import { Order } from '../../types/interface';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orderStatusEnum = OrderStatusEnum;
  currentTab = OrderStatusEnum.Requested;
  showOrderActions = false;

  ordersFromDB: Order[] = [
    // {
    //   id: 1,
    //   order_date: '11/06/22',
    //   order_price: '200$',
    //   order_status: 'requested',
    //   customer: {
    //     name: 'sai kiran',
    //     email: 'saikiran@yopmail.com'
    //   }
    // },
    // {
    //   id: 2,
    //   order_date: '9/06/22',
    //   order_price: '200$',
    //   order_status: 'in-transist',
    //   customer: {
    //     name: 'sai',
    //     email: 'sai@yopmail.com'
    //   }
    // },
    // {
    //   id: 3,
    //   order_date: '2/06/22',
    //   order_price: '200$',
    //   order_status: 'delivered',
    //   customer: {
    //     name: 'kiran',
    //     email: 'saikiran@yopmail.com'
    //   }
    // },
    // {
    //   id: 4,
    //   order_date: '3/06/22',
    //   order_price: '200$',
    //   order_status: 'cancelled',
    //   customer: {
    //     name: 'qwerty',
    //     email: 'qwerty@yopmail.com'
    //   }
    // },
    // {
    //   id: 5,
    //   order_date: '6/06/22',
    //   order_price: '200$',
    //   order_status: 'returned',
    //   customer: {
    //     name: 'abcd',
    //     email: 'abcd@yopmail.com'
    //   }
    // }
  ]

  orders: Order[] = [];

  constructor(private modal: NgbModal,
    private localStrorageService: LocalStorageService) {
    this.fetchOrders()
  }

  fetchOrders() {
    const orders = this.localStrorageService.readLocalStorage('orders');
    if(orders){
      this.ordersFromDB = orders;
    }
    this.getOrdersOf('ongoing');
  }

  ngOnInit(): void {
  }

  getOrdersOf(category: string) {
    switch (category) {
      case 'ongoing':
        this.orders = this.ordersFromDB.filter((order) => order.order_status === OrderStatusEnum.Requested || order.order_status === OrderStatusEnum.In_transist)
        this.currentTab = OrderStatusEnum.Requested;
        break;
      case 'previous':
        this.orders = this.ordersFromDB.filter((order) => order.order_status === OrderStatusEnum.Delivered)
        this.currentTab = OrderStatusEnum.Delivered;
        break;
      case 'cancelled':
        this.orders = this.ordersFromDB.filter((order) => order.order_status === OrderStatusEnum.Cancelled)
        this.currentTab = OrderStatusEnum.Cancelled;
        break;
      case 'returned':
        this.orders = this.ordersFromDB.filter((order) => order.order_status === OrderStatusEnum.Returned)
        this.currentTab = OrderStatusEnum.Returned;
        break;
    }
  }

  openSaveOrdersModal(order?: Order) {
    const modalRef = this.modal.open(SaveOrdersComponent, { size: 'md', animation: false })

    if (order) {
      modalRef.componentInstance.order = order;
    }
    modalRef.result.then(res => {
      let orders = this.localStrorageService.readLocalStorage('orders');

      if (orders) {
        if (res.isEdit) {
          const index = orders.findIndex((order:Order)=>order.id == res.id);
          delete res.edit;
          orders[index] = res;
        } else {
          orders.push(res);
        }
      } else {
        orders = [res];
      }

      this.localStrorageService.setLocalStorage('orders', orders);
      this.fetchOrders();
    }, dismiss => {
      console.log(dismiss);
    });
  }

}
