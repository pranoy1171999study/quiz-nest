import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCQMiddlePanelComponent } from './MCQ-middle-panel.component';

describe('MCQMiddlePanelComponent', () => {
  let component: MCQMiddlePanelComponent;
  let fixture: ComponentFixture<MCQMiddlePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCQMiddlePanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MCQMiddlePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
