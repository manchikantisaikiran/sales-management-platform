import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SaveOrdersComponent } from '../../modals/save-orders/save-orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes = [
  {
    path: '', component: OrdersComponent
  }
]

@NgModule({
  declarations: [
    OrdersComponent,
    SaveOrdersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(routes)
  ]
})
export class OrdersModule { }
