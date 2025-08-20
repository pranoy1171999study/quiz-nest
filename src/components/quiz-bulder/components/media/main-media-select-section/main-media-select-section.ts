import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMediaSelectSectionComponent } from './main-media-select-section.component';

describe('MainMediaSelectSectionComponent', () => {
  let component: MainMediaSelectSectionComponent;
  let fixture: ComponentFixture<MainMediaSelectSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMediaSelectSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainMediaSelectSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
