import faker from 'faker';

// =========== for development purpose only ===========
// https://www.npmjs.com/package/faker
const createUserRadomArr = () => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    bio: faker.lorem.sentence(),
    image: faker.image.image(),
    fashion: faker.image.fashion(),
  };
};

// mock random array

export const fakerData = (isDebug?: boolean) => {
  if (isDebug) {
    console.log('mock Arr', faker);
  }
  return faker;
};

export const mockArr = (numUsers = 5, isDebug?: boolean) => {
  const getArr = Array.from({ length: numUsers }, createUserRadomArr);
  // tslint:disable-next-line: no-console
  if (isDebug) {
    console.log('mock Arr', getArr);
  }
  return getArr;
};

// mock random obj
export const mockObj = (isDebug?: boolean) => {
  const object = {
    ...faker.helpers.createCard(),
    image: faker.image.image(),
    desc: faker.lorem.paragraphs(),
    avatar: faker.image.avatar(),
  };
  // tslint:disable-next-line: no-console
  if (isDebug) {
    console.log('mock Obj', object);
  }
  return object;
};

/**
 * @genArr func generate arr from faker
 * @param {*} data
 * @param {*} length
 * @param {*} isDebug
 */
export const genMockArr = ({ data, isDebug, length = 5 }: { data: () => void , isDebug?: boolean, length?: number}) => {
  let getArr: any;
  if (data) {
    getArr = Array.from({ length }, data);
  }
  if (isDebug) {
    console.log('genArr', getArr);
  }
  return getArr;
};
