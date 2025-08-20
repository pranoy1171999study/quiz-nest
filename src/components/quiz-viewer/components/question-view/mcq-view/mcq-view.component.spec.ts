import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McqViewComponent } from './mcq-view.component';

describe('McqViewComponent', () => {
  let component: McqViewComponent;
  let fixture: ComponentFixture<McqViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [McqViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(McqViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
