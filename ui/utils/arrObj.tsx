import { identity, pickBy } from 'lodash';

export const getOnlyValue = (values: any = {}) => {
  return pickBy(values, identity);
};
