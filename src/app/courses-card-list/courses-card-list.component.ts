import {
    ChangeDetectionStrategy, Component, EventEmitter, Input, Output,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter, tap } from 'rxjs/operators';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { Course } from '../model/course';

@Component({
    selector: 'app-courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesCardListComponent {
    @Input()
        courses: Course[] = [];

    @Output()
    private readonly coursesChanged = new EventEmitter();

    constructor(
        private readonly dialog: MatDialog,
    ) {}

    editCourse(course: Course) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '400px';

        dialogConfig.data = course;

        const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

        dialogRef.afterClosed()
            .pipe(
                filter(((value) => !!value)),
                tap((value) => {
                    this.coursesChanged.emit(value);
                }),
            ).subscribe();
    }
}
