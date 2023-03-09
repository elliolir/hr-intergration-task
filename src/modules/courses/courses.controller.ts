import { Request, Response, NextFunction } from 'express';
import coursesApi from './courses.api';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { CourseFull } from './courses.types';

const getCoursesPreview = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      data: { courses }
    } = await coursesApi.getCourses();

    return courses?.length
      ? res.json(courses)
      : res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: ReasonPhrases.NOT_FOUND });
  } catch (e) {
    next(e);
  }
};

const getCourseFullData = async (
  { params: { id } }: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data: courseData } = await coursesApi.getCourse(id);

    const { trainerId, learners: learnerIds, ...rest } = courseData;

    const [trainer, ...learners] = await Promise.all([
      coursesApi.getTrainer(trainerId),
      ...learnerIds.map((id) => coursesApi.getLearner(id))
    ]).then((result) => result.map(({ data }) => data));

    const courseFullData: CourseFull = {
      ...rest,
      trainer,
      learners
    };

    return res.json(courseFullData);
  } catch (e) {
    next(e);
  }
};

export { getCourseFullData, getCoursesPreview };
