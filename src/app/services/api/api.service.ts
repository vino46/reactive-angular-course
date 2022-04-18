import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../model/api';
import { Course } from '../../model/course';
import { Lesson } from '../../model/lesson';
import { User } from '../../model/user';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(
        private readonly http: HttpClient,
    ) {}

    static getResponsePayload<T>(response: ApiResponse<T>): T {
        return response.payload;
    }

    getCourses() {
        return this.http.get<ApiResponse<Course[]>>('/api/courses');
    }

    updateCourse(courseId: string, changes: Partial<Course>) {
        return this.http.put<ApiResponse<Course>>(`/api/courses/${courseId}`, changes);
    }

    login(email: string, password: string) {
        return this.http.post<ApiResponse<User>>('/api/login', { email, password });
    }

    searchLessons(search: string) {
        return this.http.get<ApiResponse<Lesson[]>>('/api/lessons', {
            params: {
                filter: search,
                pageSize: '100',
            },
        });
    }
}
