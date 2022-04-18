import {
    AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses/courses.service';
import { LoadingService } from '../services/loading/loading.service';

@Component({
    selector: 'app-course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        LoadingService,
    ],
})
export class CourseDialogComponent implements AfterViewInit {
    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private readonly coursesService: CoursesService,
        private readonly loadingService: LoadingService,
    ) {
        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required],
        });
    }

    ngAfterViewInit() {}

    save() {
        const changes = this.form.value;
        const updateCourse$ = this.loadingService.showLoaderUntilCompleted(
            this.coursesService.updateCourse(this.course.id, changes),
        );

        updateCourse$.subscribe((value) => {
            this.close(value);
        });
    }

    close(value?: Course) {
        this.dialogRef.close(value);
    }
}
