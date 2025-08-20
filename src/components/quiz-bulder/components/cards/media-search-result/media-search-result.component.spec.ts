import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MediaSearchResultComponent } from './media-search-result.component';

describe('MediaSearchResultComponent', () => {
  let component: MediaSearchResultComponent;
  let fixture: ComponentFixture<MediaSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaSearchResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
