import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PamokosComponent } from './pamokos.component';

describe('PamokosComponent', () => {
  let component: PamokosComponent;
  let fixture: ComponentFixture<PamokosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PamokosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PamokosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
