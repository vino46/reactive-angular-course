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

@Component({
    selector: 'app-course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDialogComponent implements AfterViewInit {
    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private readonly coursesService: CoursesService,
    ) {
        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription, Validators.required],
        });
    }

    ngAfterViewInit() {

    }

    save() {
        const changes = this.form.value;

        this.coursesService.updateCourse(this.course.id, changes)
            .subscribe((value) => {
                this.dialogRef.close(value);
            });
    }

    close() {
        this.dialogRef.close();
    }
}
