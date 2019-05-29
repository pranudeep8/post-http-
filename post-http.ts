https://medium.com/@Jestfer/testing-http-requests-in-angular-with-httpclienttestingmodule-3880ceac74cf




import { TestBed } from '@angular/core/testing';
import { CoursesService } from './courses.service';
import { HttpClientTestingModule,
         HttpTestingController } from '@angular/common/http/testing';

describe('CoursesService', () => {
  // We declare the variables that we'll use for the Test Controller and for our Service
  let httpTestingController: HttpTestingController;
  let service: CoursesService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService],
      imports: [HttpClientTestingModule]
    });

    // We inject our service (which imports the HttpClient) and the Test Controller
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(CoursesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  // Angular default test added when you generate a service using the CLI
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});



---------------------------------------------------------------------------------------




describe('#addCourse()', () => {
  it('returned Observable should match the right data', () => {
    const mockCourse = {
      name: 'Chessable',
      description: 'Space repetition to learn chess, backed by science'
    };

    service.addCourse({ topicId: 1 })
      .subscribe(courseData => {
        expect(courseData.name).toEqual('Chessable');
      });

    const req = httpTestingController.expectOne('http://localhost:8089/topics/1/courses');

    expect(req.request.method).toEqual('POST');

    req.flush(mockCourse);
  });
});




--------------------------------------------------------------------------------------




import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

   addCourse(course: any): Observable<any> {
     return this.http.post<any>
      (`http://localhost:8089/topics/${course.topicId}/courses`, course);
   }
}


------------------------------------------------------------------------------------------



describe('#getCoursesByTopic', () => {
    it('returned Observable should match the right data', () => {
      const mockCourses = [
        { name: 'Chessable',
          description: 'Space repetition to learn chess, backed by science'
        },
        { name: 'ICC',
          description: 'Play chess online'
        }
      ];

      service.getCoursesByTopic(1)
        .subscribe(coursesData => {
          expect(coursesData[0].name).toEqual('Chessable');
          expect(coursesData[0].description).toEqual(
            'Space repetition to learn chess, backed by science'
          );
          
          expect(coursesData[1].name).toEqual('ICC');
          expect(coursesData[1].description).toEqual(
            'Play chess online'
          );
        });

      const req = httpTestingController.expectOne(
        'http://localhost:8089/topics/1/courses'
      );

      req.flush(mockCourses);
    });
  });


  -----------------------------------------------------------------------------------------------------------------
  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

   addCourse(course: any): Observable<any> {
     return this.http.post<any>(`http://localhost:8089/topics/${course.topicId}/courses`, course);
   }

   getCoursesByTopic(topicId: any): Observable<any> {
     return this.http.get(`http://localhost:8089/topics/${topicId}/courses`);
   }
}