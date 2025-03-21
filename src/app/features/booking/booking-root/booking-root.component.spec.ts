import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingRootComponent } from './booking-root.component';

describe('BookingRootComponent', () => {
  let component: BookingRootComponent;
  let fixture: ComponentFixture<BookingRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
