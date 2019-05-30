
@Component({
  selector: 'app-todos',
  template: `
    <div *ngFor="let todo of todos" class="todo">
      {{todo.id}}
    </div>
  `
})
export class TodosComponent implements OnInit {
  todos = [];

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.todosService.get().subscribe(todos => {
      this.todos = todos;
    });
  }

}













const todosServiceStub = {
  get() {
    const todos = [{id: 1}];
    return of( todos );
  }
};

describe('TodosComponent', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosComponent ],
      providers: [{provide: TodosService, useValue: todosServiceStub}]
    })
  });

  it('should...', () => {
    fixture.detectChanges();
    expect(element.querySelectorAll('.todo').length).toEqual(1);
  });




















  @Component({
  selector: 'app-todos',
  template: `
    <div class="loading" *ngIf="loading">Loading...</div>
    <div *ngFor="let todo of todos" class="todo">
      {{todo.id}}
    </div>
  `
})
export class TodosComponent implements OnInit {
  loading: boolean;
  todos = [];

  constructor(private todosService: TodosService) { }

  ngOnInit() {
    this.loading = true;
    this.todosService.get().subscribe(todos => {
      this.todos = todos;
      this.loading = false;
    });
  }

}









const todosServiceStub = {
  get() {
    return of( [{id: 1}] )
  }
};

describe('TodosComponent', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosComponent ],
      providers: [{provide: TodosService, useValue: todosServiceStub}]
    })
  });

  it('should NOT work', () => {
    fixture.detectChanges();
    // The loading element should be visible
    expect(element.querySelector('.loading')).not.toBeNull();
    fixture.detectChanges();
    expect(element.querySelectorAll('.todo').length).toEqual(1);
    // The loading element should be hidden
    expect(element.querySelectorAll('.loading').length).toEqual(0);
  });
});








/** 
*  Create async observable that emits-once and completes
*  after a JS engine turn 
*/
export function fakeAsyncResponse<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

const todosServiceStub = {
  get() {
    return fakeAsyncResponse([{id: 1}]);
  }
};

describe('TodosComponent', () => {

  it('should...', async(async() => {
    const todos = element.querySelectorAll('.todo');
    const loading = element.querySelector('.loading');
    expect(loading).not.toBeNull();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(element.querySelectorAll('.todo').length).toEqual(1);
    expect(element.querySelectorAll('.loading').length).toEqual(0);
  }));
});











// prevent name collision 
import {async as _async} from "rxjs/scheduler/async";

const todosServiceStub = {
  get() {
    const todos = [{id: 1}];
    return of(todos, _async);
  }
};

it('should work..', fakeAsync(() => {
  fixture.detectChanges();
  expect(element.querySelector('.loading')).not.toBeNull();
  expect(element.querySelectorAll('.todo').length).toEqual(0);
  tick();
  fixture.detectChanges();
  expect(element.querySelectorAll('.todo').length).toEqual(1);
  expect(element.querySelectorAll('.loading').length).toEqual(0);
}));






import { cold, getTestScheduler } from 'jasmine-marbles';

const todosServiceStub = {
  get() {
    const todos$ = cold('--x|', { x: [{id: 1}] });
    return todos$
  }
};

describe('TodosComponent', () => {

  it('should work', () => {
    const todos = element.querySelectorAll('.todo');
    const loading = element.querySelector('.loading');
    expect(loading).not.toBeNull();
    getTestScheduler().flush(); // flush the observables
    fixture.detectChanges();
    expect(element.querySelectorAll('.todo').length).toEqual(1);
    expect(element.querySelectorAll('.loading').length).toEqual(0);
  });

});