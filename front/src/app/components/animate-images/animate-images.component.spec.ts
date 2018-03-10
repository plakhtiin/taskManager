import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimateImagesComponent } from './animate-images.component';

describe('AnimateImagesComponent', () => {
  let component: AnimateImagesComponent;
  let fixture: ComponentFixture<AnimateImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimateImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimateImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
