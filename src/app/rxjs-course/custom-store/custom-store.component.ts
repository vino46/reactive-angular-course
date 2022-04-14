import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../../model/rxjs-course/course.model';
import { Store } from '../../../utils/rxjs-course/store.service';

@Component({
  selector: 'app-custom-store',
  templateUrl: './custom-store.component.html',
})
export class CustomStoreComponent implements OnInit {
  readonly beginnerCourses$ = this.store.selectBeginnerCourses();
  readonly advancedCourses$ = this.store.selectAdvancedCourses();

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.store.init();

    // this.beginnerCourses$.subscribe(console.log);
    // this.advancedCourses$.subscribe(console.log);
  }

  getInnerHTML(course: Course) {
    return JSON.stringify(course);
  }

  handleUpdateClick() {
    this.store.update();
  }
}
