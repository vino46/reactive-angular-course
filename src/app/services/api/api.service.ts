import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../model/api';
import { Course } from '../../model/course';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(
        private readonly http: HttpClient,
    ) {}

    getCourses() {
        return this.http.get<ApiResponse<Course[]>>('/api/courses');
    }

    updateCourse(courseId: string, changes: Partial<Course>) {
        return this.http.put<ApiResponse<Course>>(`/api/courses/${courseId}`, changes);
    }
}
