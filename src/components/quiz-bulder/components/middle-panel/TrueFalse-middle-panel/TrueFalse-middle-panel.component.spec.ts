import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrueFalseMiddlePanelComponent } from './TrueFalse-middle-panel.component';

describe('TrueFalseMiddlePanelComponent', () => {
  let component: TrueFalseMiddlePanelComponent;
  let fixture: ComponentFixture<TrueFalseMiddlePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalseMiddlePanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrueFalseMiddlePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
