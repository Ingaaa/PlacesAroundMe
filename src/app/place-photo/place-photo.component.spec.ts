import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacePhotoComponent } from './place-photo.component';

describe('PlacePhotoComponent', () => {
  let component: PlacePhotoComponent;
  let fixture: ComponentFixture<PlacePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
