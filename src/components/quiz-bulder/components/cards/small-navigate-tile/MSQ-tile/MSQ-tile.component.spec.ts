import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MSQTileComponent } from './MSQ-tile.component';

describe('MSQTileComponent', () => {
  let component: MSQTileComponent;
  let fixture: ComponentFixture<MSQTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MSQTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MSQTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
