export interface Course {
  readonly id: number;
  readonly title: string;
  readonly category: 'beginner' | 'advanced';
}
