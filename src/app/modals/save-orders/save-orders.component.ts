import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../../types/interface';

@Component({
  selector: 'app-save-orders',
  templateUrl: './save-orders.component.html',
  styleUrls: ['./save-orders.component.scss']
})
export class SaveOrdersComponent implements OnInit {

  _order: Order | undefined;
  get order() { return this._order }
  @Input() set order(val) {
    if (val) {
      this._order = val;
      this.initializeForm(val);
    }
  };

  form: FormGroup;
  isFormSubmitted = false;
  orderStatus = ['requested', 'in-transist', 'delivered', 'cancelled', 'returned'];
  maxDate = { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() };
  
  constructor(private ngbActiveModal: NgbActiveModal,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      order_date: ['', [Validators.required]],
      order_price: ['', [Validators.required]],
      order_status: ['', [Validators.required]],
      customer: this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]]
      }),
    })
  }

  get customerFormControl() {
    return this.form.get('customer') as FormGroup;
  }

  ngOnInit(): void {
  }

  initializeForm(data: Order) {
    const orderDateArray = data.order_date.split('/')
    this.form.setValue({
      id: data.id || '',
      order_date: data.order_date ? {day: +orderDateArray[2], month: +orderDateArray[1], year: +orderDateArray[0]} : '',
      order_price: data.order_price || '',
      order_status: data.order_status || '',
      customer: {
        name: data.customer.name || '',
        email: data.customer.email || ''
      },
    })
  }

  submit() {
    console.log(this.form)
    if (this.form.invalid) {
      this.isFormSubmitted = true;
      return;
    }

    const formValue = this.form.value;
    const isEdit = this.order ? true: false;
    this.ngbActiveModal.close( { ...formValue, order_date: `${formValue.order_date.year}/${formValue.order_date.month}/${formValue.order_date.day}`, isEdit });

  }

  dismiss() {
    this.ngbActiveModal.dismiss();
  }

}
