import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiResponse } from '../../model/api';
import { Course } from '../../model/course';
import { ApiService } from '../api/api.service';

@Injectable({
    providedIn: 'root',
})
export class CoursesService {
    constructor(
        private readonly apiService: ApiService,
    ) {}

    private getResponsePayload<T>(response: ApiResponse<T>): T {
        return response.payload;
    }

    getCourses(sortFunction?: (c1: Course, c2: Course) => number): Observable<Course[]> {
        return this.apiService.getCourses().pipe(
            map((response) => {
                const payload = this.getResponsePayload(response);

                return sortFunction ? [...payload].sort(sortFunction) : payload;
            }),
            shareReplay(),
        );
    }

    updateCourse(courseId: string, changes: Partial<Course>) {
        return this.apiService.updateCourse(courseId, changes).pipe(
            map(this.getResponsePayload),
            shareReplay(),
        );
    }
}
