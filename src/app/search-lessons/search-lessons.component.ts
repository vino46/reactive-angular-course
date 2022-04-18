import {
    ChangeDetectionStrategy, Component,
} from '@angular/core';
import {
    BehaviorSubject,
} from 'rxjs';
import { Lesson } from '../model/lesson';
import { CoursesService } from '../services/courses/courses.service';

@Component({
    selector: 'app-course',
    templateUrl: './search-lessons.component.html',
    styleUrls: ['./search-lessons.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLessonsComponent {
    private readonly searchResultsSubject = new BehaviorSubject<Lesson[]>([]);
    public readonly searchResults$ = this.searchResultsSubject.asObservable();

    private readonly activeLessonSubject = new BehaviorSubject<Lesson | null>(null);
    public readonly activeLesson$ = this.activeLessonSubject.asObservable();

    constructor(
        private readonly coursesService: CoursesService,
    ) {}

    handleSearch(search: string) {
        this.coursesService.searchLessons(search).subscribe((lessons) => {
            this.searchResultsSubject.next(lessons);
        });
    }

    handleOpenLesson(lesson: Lesson) {
        this.activeLessonSubject.next(lesson);
    }

    handleBackToSearch() {
        this.activeLessonSubject.next(null);
    }
}
