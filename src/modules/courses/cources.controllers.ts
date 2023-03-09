import { CourseFull, Person } from './courses.types';
import coursesService from './courses.service';

const integrationController = {
  async getCourses() {
    const { data } = await coursesService.getCourses();
    return data;
  },
  async getTrainer(id: string) {
    const { data } = await coursesService.getTrainer(id);
    return data;
  },
  async getLearners(ids: string[]): Promise<Person[]> {
    const responses = await Promise.all(
      ids.map((id) => coursesService.getLearner(id))
    );

    return responses.map(({ data }) => data);
  },
  async getCourse(id: string): Promise<CourseFull> {
    const { data: courseData } = await coursesService.getCourse(id);

    const { trainerId, learners: learnerIds, ...rest } = courseData;

    // TODO speed-up (with Promise.all or even a proper caching?)
    const trainer = await this.getTrainer(trainerId);
    const learners = await this.getLearners(learnerIds);

    return {
      ...rest,
      trainer,
      learners
    };
  }
};

export default integrationController;
