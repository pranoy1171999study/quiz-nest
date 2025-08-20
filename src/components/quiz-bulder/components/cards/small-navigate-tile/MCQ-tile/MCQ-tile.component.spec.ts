import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MCQTileComponent } from './MCQ-tile.component';

describe('MCQTileComponent', () => {
  let component: MCQTileComponent;
  let fixture: ComponentFixture<MCQTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MCQTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MCQTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
