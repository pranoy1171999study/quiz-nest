import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MSQMiddlePanelComponent } from './MSQ-middle-panel.component';

describe('MSQMiddlePanelComponent', () => {
  let component: MSQMiddlePanelComponent;
  let fixture: ComponentFixture<MSQMiddlePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MSQMiddlePanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MSQMiddlePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
