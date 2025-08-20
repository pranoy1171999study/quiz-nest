import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SmallNavigateTileComponent } from './small-navigate-tile.component';

describe('SmallNavigateTileComponent', () => {
  let component: SmallNavigateTileComponent;
  let fixture: ComponentFixture<SmallNavigateTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallNavigateTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SmallNavigateTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
