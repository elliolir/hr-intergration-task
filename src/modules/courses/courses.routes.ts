import { Router, Request } from 'express';
import { StatusCodes } from 'http-status-codes';

import coursesService from './courses.service';
import coursesRepository from './courses.repository';

const router = Router();
router.get('/', async (req, res, next) => {
  try {
    const courses = await coursesRepository.getCourses();

    return courses?.length
      ? res.json(courses)
      : res.status(StatusCodes.NOT_FOUND);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req: Request<{ id: string }>, res, next) => {
  try {
    const course = await coursesService.getCourseFull(req.params.id);

    return course ? res.json(course) : res.status(StatusCodes.NOT_FOUND);
  } catch (e) {
    next(e);
  }
});

export default router;
