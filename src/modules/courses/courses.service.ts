import { CourseFull } from './courses.types';
import coursesRepository from './courses.repository';

const coursesService = {
  async getCourseFull(id: string): Promise<CourseFull | null> {
    const courseData = await coursesRepository.getCourse(id);

    if (!courseData) {
      return null;
    }

    const { trainerId, learners: learnerIds, ...rest } = courseData;

    // TODO speed-up (with Promise.all or even a proper caching?)
    const trainer = await coursesRepository.getTrainer(trainerId);
    const learners = await coursesRepository.getLearners(learnerIds);

    if (!trainer) {
      return null;
    }

    return {
      ...rest,
      trainer,
      learners
    };
  }
};

export default coursesService;
