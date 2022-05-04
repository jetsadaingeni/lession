import { Response } from 'express';
export type IResponseDTO<T = string> = Promise<Response<T, Record<string, any>>>;
export interface ResponseSuccess {
  success: string;
}
export type ResponseSuccessData = ResponseSuccess & {
  data: any;
};
