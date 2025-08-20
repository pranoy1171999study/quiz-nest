import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MsqViewComponent } from './msq-view.component';

describe('MsqViewComponent', () => {
  let component: MsqViewComponent;
  let fixture: ComponentFixture<MsqViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsqViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MsqViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
