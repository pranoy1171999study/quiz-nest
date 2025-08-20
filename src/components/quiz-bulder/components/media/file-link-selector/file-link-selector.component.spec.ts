import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FileLinkSelectorComponent } from './file-link-selector.component';

describe('FileLinkSelectorComponent', () => {
  let component: FileLinkSelectorComponent;
  let fixture: ComponentFixture<FileLinkSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileLinkSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileLinkSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
