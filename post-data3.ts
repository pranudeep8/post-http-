import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ViewComponentComponent } from './view-component.component';
import { Service } from '../../service/service';

describe('ViewComponentComponent', () => {
  let component: ViewComponentComponent;
  let fixture: ComponentFixture<ViewComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data successfully if called asynchronously', fakeAsync(() => {
    let fixture = TestBed.createComponent(ViewComponentComponent);
    let app = fixture.debugElement.componentInstance;
    let dataService = fixture.debugElement.injector.get(Service);
    let spy = spyOn(dataService, 'getData')
      .and.returnValue(Promise.resolve('Data'));
    fixture.detectChanges();
    tick();
    expect(app.data).toBe('Data');

  }));
});
