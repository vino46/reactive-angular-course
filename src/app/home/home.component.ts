import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from '../services/courses/courses.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    beginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor(
        private readonly coursesService: CoursesService,
    ) {}

    ngOnInit() {
        this.getCourses();
    }

    getCourses() {
        const courses$ = this.coursesService.getCourses(sortCoursesBySeqNo);

        this.beginnerCourses$ = courses$.pipe(
            map((courses) => courses.filter((course) => course.category === 'BEGINNER')),
        );
        this.advancedCourses$ = courses$.pipe(
            map((courses) => courses.filter((course) => course.category === 'ADVANCED')),
        );
    }
}
