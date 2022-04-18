import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CoursesStore } from '../services/courses/courses.store.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
    public readonly beginnerCourses$ = this.coursesStore.filterByCategory('BEGINNER');
    public readonly advancedCourses$ = this.coursesStore.filterByCategory('ADVANCED');

    constructor(
        private readonly coursesStore: CoursesStore,
    ) {}
}
