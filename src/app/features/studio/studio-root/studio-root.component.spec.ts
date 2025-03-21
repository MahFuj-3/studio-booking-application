import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioRootComponent } from './studio-root.component';

describe('StudioRootComponent', () => {
  let component: StudioRootComponent;
  let fixture: ComponentFixture<StudioRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudioRootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
