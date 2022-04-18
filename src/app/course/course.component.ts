import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concatMap, map, startWith } from 'rxjs/operators';
import { combineLatest, Observable, throwError } from 'rxjs';
import { CoursesService } from '../services/courses/courses.service';
import { Course } from '../model/course';
import { Lesson } from '../model/lesson';

interface CourseData {
    course: Course;
    lessons: Lesson[];
}

const defaultData: CourseData = {
    course: {
        description: 'Default Course Title',
    } as Course,
    lessons: [],
};

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent {
    private readonly course$ = this.route.paramMap.pipe(
        map((paramMap) => parseInt(paramMap.get('courseId'), 10)),
        concatMap((id) => {
            if (id) {
                return this.coursesService.getCourse(id);
            }

            return throwError('getCourse: Invalid ID received');
        }),
    );

    private readonly lessons$ = this.route.paramMap.pipe(
        map((paramMap) => parseInt(paramMap.get('courseId'), 10)),
        concatMap((id) => {
            if (id) {
                return this.coursesService.getCourseLessons(id);
            }

            return throwError('getCourseLessons: Invalid ID received');
        }),
    );

    public readonly courseData$: Observable<CourseData> = combineLatest([this.course$, this.lessons$])
        .pipe(
            // Using startWith to show default values implementation
            startWith([defaultData.course, defaultData.lessons] as const),
            map(([course, lessons]) => ({
                course,
                lessons,
            })),
        );

    constructor(
        private readonly route: ActivatedRoute,
        private readonly coursesService: CoursesService,
    ) {}
}
