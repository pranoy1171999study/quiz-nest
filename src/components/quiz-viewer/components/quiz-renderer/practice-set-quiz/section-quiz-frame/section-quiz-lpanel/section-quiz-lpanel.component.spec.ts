import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionQuizLpanelComponent } from './section-quiz-lpanel.component';

describe('SectionQuizLpanelComponent', () => {
  let component: SectionQuizLpanelComponent;
  let fixture: ComponentFixture<SectionQuizLpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionQuizLpanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionQuizLpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
