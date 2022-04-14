import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../../model/rxjs-course/course.model';
import { FakeApi } from './fake-api.service';

@Injectable({
  providedIn: 'root',
})
export class Store {
  private coursesSubject = new BehaviorSubject<Course[]>([]);
  private courses$ = this.coursesSubject.asObservable();

  constructor(private readonly apiService: FakeApi) {}

  init() {
    this.apiService.getCourses().subscribe((courses) => {
      this.coursesSubject.next(courses);
    });
  }

  update() {
    return this.apiService
      .updateCourse(0, {
        title: 'THIS ONE IS UPDATED TITLE',
      })
      .subscribe((courses) => {
        this.coursesSubject.next(courses);
      });
  }

  private filterByCategory(category: Course['category']) {
    return this.courses$.pipe(
      map((courses) => courses.filter((course) => course.category === category))
    );
  }

  selectBeginnerCourses() {
    return this.filterByCategory('beginner');
  }

  selectAdvancedCourses() {
    return this.filterByCategory('advanced');
  }
}
