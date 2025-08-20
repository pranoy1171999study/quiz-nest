import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponentsComponent } from './layout.component';

describe('LayoutComponentsComponent', () => {
  let component: LayoutComponentsComponent;
  let fixture: ComponentFixture<LayoutComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponentsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
