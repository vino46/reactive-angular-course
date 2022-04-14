import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../model/rxjs-course/course.model';

@Injectable({
  providedIn: 'root',
})
export class FakeApi {
  private courses: Course[] = [
    {
      id: 0,
      title: 'Test Kek',
      category: 'beginner',
    },
    {
      id: 1,
      title: 'Some Title',
      category: 'advanced',
    },
    {
      id: 42,
      title: 'Some Another Title',
      category: 'beginner',
    },
    {
      id: 123,
      title: 'Lorem Ipsum Title Meh',
      category: 'advanced',
    },
  ];
  private fakeRequest<T>(expectedResponse: T, timeout = 300) {
    return new Observable<T>((observer) => {
      setTimeout(() => {
        observer.next(expectedResponse);
        observer.complete();
      }, timeout);
    });
  }

  getCourses() {
    return this.fakeRequest(this.courses);
  }

  updateCourse(id: Course['id'], patch: Partial<Course>) {
    const response = this.courses.map((course) => {
      if (course.id === id) {
        return {
          ...course,
          ...patch,
        };
      }

      return course;
    });

    return this.fakeRequest(response);
  }
}
