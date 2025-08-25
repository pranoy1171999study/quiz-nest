import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionQuizMiddlePanelComponent } from './section-quiz-middle-panel.component';

describe('SectionQuizMiddlePanelComponent', () => {
  let component: SectionQuizMiddlePanelComponent;
  let fixture: ComponentFixture<SectionQuizMiddlePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionQuizMiddlePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionQuizMiddlePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
