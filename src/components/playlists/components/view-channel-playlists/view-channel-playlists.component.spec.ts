import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChannelPlaylistsComponent } from './view-channel-playlists.component';

describe('ViewChannelPlaylistsComponent', () => {
  let component: ViewChannelPlaylistsComponent;
  let fixture: ComponentFixture<ViewChannelPlaylistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewChannelPlaylistsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewChannelPlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
