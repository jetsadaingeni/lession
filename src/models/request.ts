import { Response } from 'express';
export type IResponseDTO<T = string> = Promise<Response<T, Record<string, any>>>;
