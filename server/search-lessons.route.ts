import { Request, Response } from 'express';
import { setTimeout } from 'timers';
import { LESSONS } from './db-data';

export function searchLessons(req: Request, res: Response) {
    const queryParams = req.query;

    const { courseId } = queryParams;
    const filter = queryParams.filter || '';
    const sortOrder = queryParams.sortOrder || 'asc';
    const pageNumber = parseInt(queryParams.pageNumber as any, 10) || 0;
    const pageSize = parseInt(queryParams.pageSize as any, 10) || 3;

    let lessons;

    if (courseId) {
        lessons = Object.values(LESSONS).filter((lesson) => `${lesson.courseId}` === courseId).sort((l1, l2) => l1.id - l2.id);
    } else {
        lessons = Object.values(LESSONS);
    }

    if (filter) {
        lessons = lessons.filter((lesson) => lesson.description.trim().toLowerCase().search((filter as any).toLowerCase()) >= 0);
    }

    if (sortOrder === 'desc') {
        lessons = lessons.reverse();
    }

    const initialPos = pageNumber * pageSize;

    const lessonsPage = lessons.slice(initialPos, initialPos + pageSize);

    setTimeout(() => {
        res.status(200).json({ payload: lessonsPage });
    }, 1000);
}
