import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveOrdersComponent } from './save-orders.component';

describe('SaveOrdersComponent', () => {
  let component: SaveOrdersComponent;
  let fixture: ComponentFixture<SaveOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
