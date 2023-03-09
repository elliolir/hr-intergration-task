import axios from 'axios';
import { Person, CoursePreview } from './courses.types';

// TODO add env variables validation?
const { BASE_URL } = process.env;

const integrationUrls = {
  trainers: `${BASE_URL}/api/trainers`,
  learners: `${BASE_URL}/api/learners`,
  courses: `${BASE_URL}/api/courses`
};

const coursesService = {
  getTrainers: () => axios.get<Person[]>(integrationUrls.trainers),
  getTrainer: (trainerId: string) =>
    axios.get<Person>(`${integrationUrls.trainers}/${trainerId}`),
  getLearners: () => axios.get<Person[]>(integrationUrls.learners),
  getLearner: (learnerId: string) =>
    axios.get<Person>(`${integrationUrls.learners}/${learnerId}`),
  getCourses: () => axios.get<CoursePreview[]>(integrationUrls.courses),
  getCourse: (courseId: string) =>
    axios.get<CoursePreview>(`${integrationUrls.courses}/${courseId}`)
};

export default coursesService;
