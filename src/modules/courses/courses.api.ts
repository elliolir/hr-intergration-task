import axios from 'axios';
import { Person, CoursePreview, CoursesResp } from './courses.types';

const { BASE_URL } = process.env;

const instance = axios.create({
  baseURL: `${BASE_URL}/api`
});

const integrationUrls = {
  trainers: `/trainers`,
  learners: `/learners`,
  courses: `/courses`
};

const coursesApi = {
  getTrainer: (trainerId: string) =>
    instance.get<Person>(`${integrationUrls.trainers}/${trainerId}`),
  getLearner: (learnerId: string) =>
    instance.get<Person>(`${integrationUrls.learners}/${learnerId}`),
  getCourses: () => instance.get<CoursesResp>(integrationUrls.courses),
  getCourse: (courseId: string) =>
    instance.get<CoursePreview>(`${integrationUrls.courses}/${courseId}`)
};

export default coursesApi;
