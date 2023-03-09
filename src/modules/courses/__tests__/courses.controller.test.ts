import { getCourseFullData, getCoursesPreview } from '../courses.controller';
import { mockCoursesPreview, mockCourseFull } from '../__mocks__/courses.api';
import { Response, Request } from 'express';
import coursesApi from '../courses.api';
import { AxiosResponse } from 'axios';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

jest.mock('../courses.api.ts');

const mockedApi = jest.mocked(coursesApi);

const mockedRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis()
} as unknown as Response;

const mockedNext = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getCourseFullData', () => {
  it('Should return full course data', async () => {
    const mockedReq = {
      params: { id: 'ef131a0c-3006-4a38-8cfd-085fa08f8361' }
    } as Request<{ id: string }>;

    await getCourseFullData(mockedReq, mockedRes, mockedNext);

    expect(mockedRes.json).toHaveBeenCalledWith(mockCourseFull);
    expect(coursesApi.getCourse).toHaveBeenCalled();
    expect(coursesApi.getLearner).toHaveBeenCalledTimes(2);
    expect(coursesApi.getTrainer).toHaveBeenCalledTimes(1);
  });
  it('Should pass an error to the error-handling middleware when the course is missing', async () => {
    const mockedReq = {
      params: { id: 'ef131a0c-3006-4a38-8cfd-000000000000' }
    } as Request<{ id: string }>;

    await getCourseFullData(mockedReq, mockedRes, mockedNext);
    expect(mockedRes.json).toHaveBeenCalledTimes(0);
    expect(mockedRes.status).toHaveBeenCalledTimes(0);

    // next with argument is automatically redirected to the error-handling middleware
    expect(mockedNext.mock.lastCall.length).toBe(1);
    expect(mockedNext).toHaveBeenCalledTimes(1);
  });
});

describe('getCoursesPreview', () => {
  const mockedReq = {};

  it('Should return all the courses', async () => {
    await getCoursesPreview(mockedReq as Request, mockedRes, mockedNext);

    expect(mockedRes.json).toHaveBeenCalledWith(mockCoursesPreview.courses);
    expect(coursesApi.getCourses).toHaveBeenCalled();
  });

  it('Should return 404 when courses are not found', async () => {
    mockedApi.getCourses.mockResolvedValue({
      data: { courses: [] }
    } as AxiosResponse);

    await getCoursesPreview(mockedReq as Request, mockedRes, mockedNext);

    expect(mockedRes.json).toHaveBeenCalledWith({
      message: ReasonPhrases.NOT_FOUND
    });
    expect(mockedRes.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
  });
  it('Should pass an error to the error-handling middleware in case of the error', async () => {
    mockedApi.getCourses.mockImplementation(() => {
      throw new Error('test error');
    });

    await getCoursesPreview(mockedReq as Request, mockedRes, mockedNext);

    expect(mockedRes.json).toHaveBeenCalledTimes(0);
    expect(mockedRes.status).toHaveBeenCalledTimes(0);

    expect(mockedNext.mock.lastCall.length).toBe(1);
    expect(mockedNext).toHaveBeenCalledTimes(1);
  });
});
