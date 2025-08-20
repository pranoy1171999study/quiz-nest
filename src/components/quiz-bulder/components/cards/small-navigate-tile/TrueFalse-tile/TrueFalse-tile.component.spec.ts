import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrueFalseTileComponent } from './TrueFalse-tile.component';

describe('TrueFalseTileComponent', () => {
  let component: TrueFalseTileComponent;
  let fixture: ComponentFixture<TrueFalseTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrueFalseTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TrueFalseTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
