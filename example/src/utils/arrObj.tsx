import { identity, pickBy } from 'lodash';

export const getOnlyValue = (values = {}) => {
  return pickBy(values, identity) as any;
};
