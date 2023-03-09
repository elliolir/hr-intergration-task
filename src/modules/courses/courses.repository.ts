import axios from 'axios';
import { Person, CoursePreview } from './courses.types';
import { handleAxiosResponse } from '../core/repository.core';

const { BASE_URL } = process.env;

const integrationUrls = {
  trainers: `${BASE_URL}/api/trainers`,
  learners: `${BASE_URL}/api/learners`,
  courses: `${BASE_URL}/api/courses`
};

const requesters = {
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

const coursesRepository = {
  getTrainer: (id: string): Promise<Person | null> =>
    handleAxiosResponse(requesters.getTrainer(id)),
  getCourse: (id: string): Promise<CoursePreview | null> =>
    handleAxiosResponse(requesters.getCourse(id)),
  getCourses: (): Promise<CoursePreview[] | null> =>
    handleAxiosResponse(requesters.getCourses()),
  getLearners: async (ids: string[]): Promise<Person[]> => {
    const responses = await Promise.all(
      ids.map((id) => handleAxiosResponse(requesters.getLearner(id)))
    );

    return responses.map(({ data }) => data);
  }
};

export default coursesRepository;
