import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Course } from '../../model/course';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    constructor(
        private readonly apiService: ApiService,
    ) {}

    getCourses(sortFunction?: (c1: Course, c2: Course) => number): Observable<Course[]> {
        return this.apiService.getCourses().pipe(
            map((response) => {
                const payload = ApiService.getResponsePayload(response);

                return sortFunction ? [...payload].sort(sortFunction) : payload;
            }),
            shareReplay(),
        );
    }

    updateCourse(courseId: string, changes: Partial<Course>) {
        return this.apiService.updateCourse(courseId, changes).pipe(
            map(ApiService.getResponsePayload),
            shareReplay(),
        );
    }
}
