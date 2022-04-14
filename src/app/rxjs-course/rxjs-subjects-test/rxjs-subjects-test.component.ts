import { Component, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-rxjs-subjects-test',
  templateUrl: './rxjs-subjects-test.component.html',
})
export class SubjectsTestComponent implements OnInit {
  ngOnInit() {
    // this.testSubject();
    // this.testBehaviorSubject();
    // this.testAsyncSubject();
    // this.testReplaySubject();
  }

  private testSubject() {
    const subject = new Subject();
    const series$ = subject.asObservable();

    series$.subscribe((data) => console.log('Subject emits', data));

    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.complete();
  }

  private testBehaviorSubject() {
    const subject = new BehaviorSubject(0);
    const series$ = subject.asObservable();

    series$.subscribe((data) =>
      console.log('BehaviorSubject emits (via early subscription)', data)
    );

    subject.next(1);
    subject.next(2);
    subject.next(3);
    // completion will affect late subscription. That subscription would not receive any value
    // subject.complete();

    setTimeout(() => {
      series$.subscribe((data) =>
        console.log('BehaviorSubject emits (via late subscription)', data)
      );

      subject.next(4);
    }, 3000);
  }

  private testAsyncSubject() {
    const subject = new AsyncSubject();
    const series$ = subject.asObservable();

    series$.subscribe((data) =>
      console.log('AsyncSubject emits (via early subscription)', data)
    );

    subject.next(1);
    subject.next(2);
    subject.next(3);
    // completion required
    subject.complete();

    setTimeout(() => {
      series$.subscribe((data) =>
        console.log('AsyncSubject emits (via late subscription)', data)
      );
    }, 3000);
  }

  private testReplaySubject() {
    const subject = new ReplaySubject();
    const series$ = subject.asObservable();

    series$.subscribe((data) =>
      console.log('ReplaySubject emits (via early subscription)', data)
    );

    subject.next(1);
    subject.next(2);
    subject.next(3);

    setTimeout(() => {
      series$.subscribe((data) =>
        console.log('ReplaySubject emits (via late subscription)', data)
      );

      subject.next(4);
      subject.complete();
    }, 3000);
  }
}
