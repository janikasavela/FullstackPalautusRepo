import { Request, Response, NextFunction } from 'express';
import * as z from 'zod';

const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.errors });
  } else {
    next(error);
  }
};

export default errorMiddleware;
