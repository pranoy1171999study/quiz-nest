import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionMediaSelectSectionComponent } from './option-media-select-section.component';

describe('OptionMediaSelectSectionComponent', () => {
  let component: OptionMediaSelectSectionComponent;
  let fixture: ComponentFixture<OptionMediaSelectSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionMediaSelectSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionMediaSelectSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
