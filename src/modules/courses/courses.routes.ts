import { Router } from 'express';

import { getCourseFullData, getCoursesPreview } from './courses.controller';

const router = Router();

router.get('/', getCoursesPreview); //self-testing route
router.get('/:id', getCourseFullData);

export default router;
