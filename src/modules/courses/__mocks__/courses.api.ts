import { CoursesResp } from '../courses.types';
import { AxiosError } from 'axios';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const mockCoursesPreview: CoursesResp = {
  courses: [
    {
      id: 'ef131a0c-3006-4a38-8cfd-085fa08f8361',
      title: 'Business-focused bifurcated secured line',
      date: '2073-01-18T06:57:06.870Z',
      trainerId: 'd2b16518-cb01-42b1-970a-a5337dffc155',
      learners: [
        'b98509fc-a393-4e43-9bf3-32f506ec7fa0',
        '8ec62b73-d69d-43eb-b3c9-3b71aad259de',
        'e9c7a7cd-33d5-4007-a6a4-11e9c208eb76',
        '8ec62b73-d69d-43eb-b3c9-3b71aad259de',
        'd7aaf22e-d82f-448e-bc09-a6072e788b20',
        '3988158d-7309-46c1-bec1-8cb21b50f7b4',
        'e9c7a7cd-33d5-4007-a6a4-11e9c208eb76',
        'e9c7a7cd-33d5-4007-a6a4-11e9c208eb76',
        'a259bc34-01c8-4452-89a1-66a36a01cc7b'
      ]
    }
  ]
};

const mockCourse = {
  id: 'ef131a0c-3006-4a38-8cfd-085fa08f8361',
  title: 'Business-focused bifurcated secured line',
  date: '2073-01-18T06:57:06.870Z',
  trainerId: 'd2b16518-cb01-42b1-970a-a5337dffc155',
  learners: [
    'b98509fc-a393-4e43-9bf3-32f506ec7fa0',
    '8ec62b73-d69d-43eb-b3c9-3b71aad259de'
  ]
};

const mockTrainer = {
  id: 'd2b16518-cb01-42b1-970a-a5337dffc155',
  name: 'Miss Linda Conroy'
};

const mockLearners = [
  {
    id: 'b98509fc-a393-4e43-9bf3-32f506ec7fa0',
    name: 'Mrs. Johanna Lebsack'
  },
  {
    id: '8ec62b73-d69d-43eb-b3c9-3b71aad259de',
    name: 'Patrick Mills'
  }
];

const learnersMap = {
  [mockLearners[0].id]: mockLearners[0],
  [mockLearners[1].id]: mockLearners[1]
};

const mockCourseFull = {
  id: mockCourse.id,
  title: mockCourse.title,
  date: mockCourse.date,
  trainer: mockTrainer,
  learners: mockLearners
};

const coursesApi = {
  getCourses: jest.fn().mockResolvedValue({ data: mockCoursesPreview }),
  getTrainer: jest.fn((id: string) => {
    if (id === mockTrainer.id) {
      return Promise.resolve({ data: mockTrainer });
    }

    throw new AxiosError(
      ReasonPhrases.NOT_FOUND,
      StatusCodes.NOT_FOUND.toString()
    );
  }),
  getCourse: jest.fn((id: string) => {
    if (id === mockCourse.id) {
      return Promise.resolve({ data: mockCourse });
    }

    throw new AxiosError(
      ReasonPhrases.NOT_FOUND,
      StatusCodes.NOT_FOUND.toString()
    );
  }),
  getLearner: jest.fn((id: string) => {
    if (learnersMap[id]) {
      return Promise.resolve({ data: learnersMap[id] });
    }

    throw new AxiosError(
      ReasonPhrases.NOT_FOUND,
      StatusCodes.NOT_FOUND.toString()
    );
  })
};

export default coursesApi;
export { mockCoursesPreview, mockCourseFull };
