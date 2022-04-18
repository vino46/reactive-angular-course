import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Course, sortCoursesBySeqNo } from '../model/course';
import { CoursesService } from '../services/courses/courses.service';
import { LoadingService } from '../services/loading/loading.service';
import { MessagesService } from '../services/messages/messages.service';

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
        private readonly loadingService: LoadingService,
        private readonly messagesService: MessagesService,
    ) {}

    ngOnInit() {
        this.getCourses();
    }

    getCourses() {
        const courses$ = this.loadingService
            .showLoaderUntilCompleted(this.coursesService.getCourses(sortCoursesBySeqNo))
            .pipe(
                catchError((error) => {
                    const message = 'Could not load courses';
                    this.messagesService.showMessages(message);
                    console.log(message, error);

                    return throwError(error);
                }),
            );

        this.beginnerCourses$ = courses$.pipe(
            map((courses) => courses.filter((course) => course.category === 'BEGINNER')),
        );
        this.advancedCourses$ = courses$.pipe(
            map((courses) => courses.filter((course) => course.category === 'ADVANCED')),
        );
    }
}
