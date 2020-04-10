import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilisateurViewComponent } from './utilisateur-view.component';

describe('UtilisateurViewComponent', () => {
  let component: UtilisateurViewComponent;
  let fixture: ComponentFixture<UtilisateurViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilisateurViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilisateurViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
