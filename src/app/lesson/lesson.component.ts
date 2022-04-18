import {
    ChangeDetectionStrategy, Component, Input,
} from '@angular/core';
import { Lesson } from '../model/lesson';

@Component({
    selector: 'app-lesson',
    templateUrl: './lesson.component.html',
    styleUrls: ['./lesson.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonComponent {
    @Input()
    public lesson!: Lesson;
}
