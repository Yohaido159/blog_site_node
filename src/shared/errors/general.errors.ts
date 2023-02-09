import { HttpException } from './http.error';

export const throwIfFieldsMissing = (fields: { [key: string]: string | undefined }) => {
  const missingFields = Object.keys(fields).filter(key => !fields[key]);
  if (missingFields.length) {
    throw new HttpException(400, `Missing required fields: ${missingFields.join('\n')}`);
  }
};
