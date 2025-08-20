import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SectionStartingPageComponent } from './section-starting-page.component';

describe('SectionStartingPageComponent', () => {
  let component: SectionStartingPageComponent;
  let fixture: ComponentFixture<SectionStartingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionStartingPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionStartingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
