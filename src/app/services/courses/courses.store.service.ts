import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { ApiResponse } from '../../model/api';
import { Course, sortCoursesBySeqNo } from '../../model/course';
import { ApiService } from '../api/api.service';
import { LoadingService } from '../loading/loading.service';
import { MessagesService } from '../messages/messages.service';

@Injectable({
    providedIn: 'root',
})
export class CoursesStore {
    private readonly coursesSubject = new BehaviorSubject<Course[]>([]);
    public readonly courses$ = this.coursesSubject.asObservable();

    constructor(
        private readonly apiService: ApiService,
        private readonly loadingService: LoadingService,
        private readonly messagesService: MessagesService,
    ) {
        this.getCourses();
    }

    private getResponsePayload<T>(response: ApiResponse<T>): T {
        return response.payload;
    }

    private processError(error: unknown, message: string) {
        this.messagesService.showMessages(message);
        console.log(message, error);

        return throwError(error);
    }

    private withLoadingIndicator<T>(observable$: Observable<T>): Observable<T> {
        return this.loadingService.showLoaderUntilCompleted(observable$);
    }

    private getCourses() {
        this.withLoadingIndicator(
            this.apiService.getCourses()
                .pipe(
                    map(this.getResponsePayload),
                    catchError((error) => this.processError(error, 'Could not load courses!')),
                    shareReplay(),
                ),
        ).subscribe((data) => this.coursesSubject.next(data));
    }

    filterByCategory(category: Course['category']): Observable<Course[]> {
        return this.courses$
            .pipe(
                map(
                    (courses) => courses
                        .filter((course) => course.category === category)
                        .sort(sortCoursesBySeqNo),
                ),
            );
    }

    updateCourse(courseId: string, changes: Partial<Course>) {
        const courses = this.coursesSubject.getValue();
        const newCourses = courses.map((course) => (course.id === courseId ? { ...course, ...changes } : course));

        this.coursesSubject.next(newCourses);

        return this.apiService.updateCourse(courseId, changes).pipe(
            map(this.getResponsePayload),
            catchError((error) => this.processError(error, 'Could not update course!')),
            shareReplay(),
        );
    }
}
