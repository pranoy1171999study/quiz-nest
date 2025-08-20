import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrueFalseViewComponent } from './true-false-view.component';

describe('TrueFalseViewComponent', () => {
  let component: TrueFalseViewComponent;
  let fixture: ComponentFixture<TrueFalseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalseViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrueFalseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
