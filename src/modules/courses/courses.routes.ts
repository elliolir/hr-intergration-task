import { Router, Request } from 'express';
import coursesController from './cources.controllers';

const router = Router();
router.get('/', async (req, res) => {
  try {
    const courses = await coursesController.getCourses();
    res.send(courses);
  } catch (e) {
    console.log(e);
    res.send('Nothing');
  }
});

router.get('/:id', async (req: Request<{ id: string }>, res) => {
  // TODO add params validation?
  try {
    const course = await coursesController.getCourse(req.params.id);
    res.send(course);
  } catch (e) {
    // TODO improve error handling
    console.log(e);
    res.send('Nothing');
  }
});

export default router;
