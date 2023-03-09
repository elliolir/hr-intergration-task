import { Response, Request, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

const handleErrorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => {
  console.error(err);

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR });
};

export { handleErrorMiddleware };
