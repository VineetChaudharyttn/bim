import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReternBookComponent } from './retern-book.component';

describe('ReternBookComponent', () => {
  let component: ReternBookComponent;
  let fixture: ComponentFixture<ReternBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReternBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReternBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
