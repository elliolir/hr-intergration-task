import { Response, Request, NextFunction } from 'express';
import { AxiosError } from 'axios';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

/**
 * based on https://axios-http.com/docs/handling_errors
 */
const handleAxiosError = (err: AxiosError, res: Response) => {
  const { response, request, message } = err;

  let statusCode: number;
  let statusMessage: string;

  if (response) {
    console.log(response);

    statusCode = response.status;
    statusMessage = response.statusText;
  } else {
    console.log(request ?? message);

    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    statusMessage = ReasonPhrases.INTERNAL_SERVER_ERROR;
  }

  res.status(statusCode).json({ message: statusMessage });
};
const handleErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  if (err instanceof AxiosError) {
    handleAxiosError(err, res);
  } else {
    console.error(err);

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

export { handleErrorMiddleware };
