import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStockCardComponent } from './show-stock-card.component';

describe('ShowStockCardComponent', () => {
  let component: ShowStockCardComponent;
  let fixture: ComponentFixture<ShowStockCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowStockCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStockCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
