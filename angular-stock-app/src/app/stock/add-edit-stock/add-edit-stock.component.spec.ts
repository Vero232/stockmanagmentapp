import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditstockComponent } from './add-edit-stock.component';

describe('AddEditstockComponent', () => {
  let component: AddEditstockComponent;
  let fixture: ComponentFixture<AddEditstockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditstockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditstockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
