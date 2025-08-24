import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChannelQuizesComponent } from './view-channel-quizes.component';

describe('ViewChannelQuizesComponent', () => {
  let component: ViewChannelQuizesComponent;
  let fixture: ComponentFixture<ViewChannelQuizesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewChannelQuizesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChannelQuizesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
