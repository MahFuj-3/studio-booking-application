import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturesRootComponent } from './features-root.component';

describe('FeaturesRootComponent', () => {
  let component: FeaturesRootComponent;
  let fixture: ComponentFixture<FeaturesRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturesRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturesRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
